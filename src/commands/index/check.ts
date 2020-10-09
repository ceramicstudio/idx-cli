import type { Doctype } from '@ceramicnetwork/ceramic-common'
import { getIDXRoot } from '@ceramicstudio/idx'
import { schemas } from '@ceramicstudio/idx-constants'
import type { DIDDocument } from 'did-resolver'
import Listr from 'listr'

import { Command } from '../../command'
import type { CommandFlags } from '../../command'
import { getPublicDID } from '../../config'

type Context = {
  did?: string
  didDoc?: DIDDocument
  doc?: Doctype
  id?: string
}

export default class CheckIndex extends Command<CommandFlags, { did: string }> {
  static description = 'check if a DID supports IDX'

  static flags = Command.flags

  static args = [{ name: 'did', description: 'DID or label', required: true }]

  async run(): Promise<void> {
    const isDID = this.args.did.startsWith('did:')

    const tasks = new Listr<Context>([
      {
        title: 'Check DID format',
        skip: () => !isDID,
        task: (ctx) => {
          if (!this.args.did.startsWith('did:3:')) {
            throw new Error('Unsupported DID: only 3IDs (did:3:...) can be resolved')
          }
          ctx.did = this.args.did
        },
      },
      {
        title: 'Load locally stored DID',
        skip: () => isDID,
        task: async (ctx) => {
          const did = await getPublicDID(this.args.did)
          if (!did) {
            throw new Error('The DID could not be found locally')
          }
          ctx.did = did
        },
      },
      {
        title: 'Resolve DID',
        task: async (ctx) => {
          const idx = await this.getIDX()
          const didDoc = await idx.resolver.resolve(ctx.did!)
          if (didDoc == null) {
            throw new Error('DID could not be resolved')
          }
          ctx.didDoc = didDoc
        },
      },
      {
        title: 'Check DID points to IDX',
        task: (ctx) => {
          const id = getIDXRoot(ctx.didDoc!)
          if (id == null) {
            throw new Error('DID does not point to IDX')
          }
          ctx.id = id
        },
      },
      {
        title: 'IDX document can be loaded',
        task: async (ctx) => {
          const ceramic = await this.getCeramic()
          const doc = await ceramic.loadDocument(ctx.id!)
          if (doc == null) {
            throw new Error('IDX document could not be loaded')
          }
          ctx.doc = doc
        },
      },
      {
        title: 'IDX document uses the correct schema',
        task: (ctx) => {
          if (ctx.doc!.metadata.schema !== schemas.IdentityIndex) {
            throw new Error('Loaded document is not using the expected IdentityIndex schema')
          }
        },
      },
    ])
    await tasks.run()
  }
}
