import { inspect } from 'util'

import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { IDX } from '@ceramicstudio/idx'
import { definitions } from '@ceramicstudio/idx-constants'
import type { Definition, IDXDefinitionName } from '@ceramicstudio/idx-tools'
import { Command as Cmd, flags } from '@oclif/command'
import Wallet from 'identity-wallet'
import ora from 'ora'
import type { Ora } from 'ora'

import { getDID, getConfig } from './config'
import type { Config } from './config'

type StringRecord = Record<string, unknown>

function getPermission() {
  return Promise.resolve([])
}

export interface CommandFlags {
  ceramic?: string
  [key: string]: unknown
}

export abstract class Command<
  Flags extends CommandFlags = CommandFlags,
  Args extends StringRecord = StringRecord
> extends Cmd {
  static flags = {
    ceramic: flags.string({ char: 'c', description: 'Ceramic API URL', env: 'CERAMIC_URL' }),
  }

  _ceramic: Ceramic | null = null
  _idx: IDX | null = null
  args!: Args
  flags!: Flags
  spinner!: Ora

  init(): Promise<void> {
    // @ts-ignore
    const { args, flags } = this.parse(this.constructor)
    this.args = args as Args
    this.flags = flags as Flags
    this.spinner = ora()
    return Promise.resolve()
  }

  async finally(): Promise<void> {
    if (this._ceramic != null) {
      await this._ceramic.close()
    }
  }

  async getCeramic(): Promise<Ceramic> {
    if (this._ceramic == null) {
      let url = this.flags.ceramic
      if (url == null) {
        const cfg = await getConfig()
        url = cfg.get('user')['ceramic-url']
      }
      this._ceramic = new Ceramic(url)
    }
    return this._ceramic
  }

  async getConfig(): Promise<Config> {
    return await getConfig()
  }

  async getIDX(did?: string): Promise<IDX> {
    if (this._idx == null) {
      const ceramic = await this.getCeramic()
      this._idx = new IDX({ ceramic, definitions })
    }
    if (did != null) {
      const wallet = await this.getWallet(did)
      await this._idx.authenticate({ provider: wallet.getDidProvider() })
    }
    return this._idx
  }

  async getDefinition(id: string): Promise<Definition> {
    const idx = await this.getIDX()
    return await idx.getDefinition(definitions[id as IDXDefinitionName] ?? id)
  }

  async getWallet(did: string): Promise<Wallet> {
    const found = await getDID(did)
    if (found == null) {
      throw new Error('Could not load DID from local store')
    }
    const ceramic = await this.getCeramic()
    return await Wallet.create({ ceramic, seed: found[1].seed, getPermission })
  }

  async getAuthenticatedCeramic(did: string): Promise<Ceramic> {
    const [ceramic, wallet] = await Promise.all([this.getCeramic(), this.getWallet(did)])
    await ceramic.setDIDProvider(wallet.getDidProvider())
    return ceramic
  }

  logJSON(data: unknown): void {
    this.log(inspect(data, { colors: true, depth: null }))
  }
}
