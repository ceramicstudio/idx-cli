import { Command } from '../../command'
import type { CommandFlags } from '../../command'

export default class SetIndex extends Command<
  CommandFlags,
  { did: string; key: string; contents: unknown }
> {
  static description = 'sets the contents of a key in IDX'

  static flags = Command.flags

  static args = [
    { name: 'did', description: 'DID or label', required: true },
    { name: 'key', required: true },
    { name: 'contents', required: true, parse: JSON.parse },
  ]

  async run(): Promise<void> {
    this.spinner.start('Setting contents...')
    try {
      const idx = await this.getIDX(this.args.did)
      await idx.set(this.args.key, this.args.contents)
      this.spinner.succeed('Contents successfully set')
    } catch (err) {
      this.spinner.fail((err as Error).message)
    }
  }
}