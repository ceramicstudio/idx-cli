import { createDefinition } from '@ceramicstudio/idx-tools'
import { flags } from '@oclif/command'

import { Command } from '../../command'
import type { CommandFlags } from '../../command'

interface Flags extends CommandFlags {
  description?: string
  url?: string
}

export default class CreateDefinition extends Command<
  Flags,
  { did: string; name: string; schema: string }
> {
  static description = 'create a definition'

  static flags = {
    ...Command.flags,
    description: flags.string({ char: 'd', description: 'description of the definition' }),
    url: flags.string({ char: 'u', description: 'documentation URL for the definition' }),
  }

  static args = [
    { name: 'did', description: 'DID to create the definition with', required: true },
    { name: 'name', description: 'name of the definition', required: true },
    { name: 'schema', description: 'schema for the definition contents', required: true },
  ]

  async run(): Promise<void> {
    this.spinner.start('Creating definition...')
    try {
      const ceramic = await this.getAuthenticatedCeramic(this.args.did)
      const id = await createDefinition(ceramic, {
        name: this.args.name,
        schema: this.args.schema,
        description: this.flags.description,
        url: this.flags.url,
      })
      this.spinner.succeed(`Definition successfully created: ${id}`)
    } catch (err) {
      this.spinner.fail((err as Error).message)
    }
  }
}
