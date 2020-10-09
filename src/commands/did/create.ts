import { randomBytes } from 'crypto'

import { encodeDagJWSResult } from '@ceramicstudio/idx-tools'
import { flags } from '@oclif/command'
import Wallet from 'identity-wallet'

import { Command } from '../../command'

function getPermission() {
  return Promise.resolve([])
}

type Flags = {
  ceramic?: string
  label?: string
  seed?: string
}

export default class CreateDID extends Command<Flags> {
  static description = 'create a new DID'

  static flags = {
    ...Command.flags,
    label: flags.string({ char: 'l', description: 'label for the DID' }),
    seed: flags.string({
      char: 's',
      description: 'Hex-encoded seed to use for the DID, starting with `0x`',
    }),
  }

  async run(): Promise<void> {
    this.spinner.start('Creating DID...')
    try {
      const ceramic = await this.getCeramic()
      const seed = this.flags.seed || '0x' + randomBytes(32).toString('hex')
      const wallet = await Wallet.create({ ceramic, seed, getPermission })

      const docID = wallet.id.replace('did:3:', 'ceramic://')
      const docRecords = await ceramic.loadDocumentRecords(docID)
      const records = docRecords.map((record) => encodeDagJWSResult(record.value))

      const cfg = await this.getConfig()
      const dids = cfg.get('dids')
      dids[wallet.id] = {
        createdAt: new Date().toISOString(),
        label: this.flags.label,
        seed,
        records,
      }
      cfg.set('dids', dids)

      this.spinner.succeed(`Created DID: ${wallet.id}`)
    } catch (err) {
      this.spinner.fail((err as Error).message)
    }
  }
}