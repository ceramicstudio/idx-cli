# IDX CLI

## Installation

```sh
npm install -g @ceramicstudio/idx-cli
```

## Usage

```sh
idx COMMAND
```

<!-- commands -->
* [`idx bootstrap`](#idx-bootstrap)
* [`idx config:get KEY`](#idx-configget-key)
* [`idx config:reset KEY`](#idx-configreset-key)
* [`idx config:set KEY VALUE`](#idx-configset-key-value)
* [`idx config:show`](#idx-configshow)
* [`idx did:create`](#idx-didcreate)
* [`idx did:delete DID`](#idx-diddelete-did)
* [`idx did:label DID [LABEL]`](#idx-didlabel-did-label)
* [`idx did:list`](#idx-didlist)
* [`idx help [COMMAND]`](#idx-help-command)
* [`idx index:check DID`](#idx-indexcheck-did)
* [`idx index:get DID KEY`](#idx-indexget-did-key)
* [`idx index:inspect DID`](#idx-indexinspect-did)
* [`idx index:set DID KEY CONTENTS`](#idx-indexset-did-key-contents)

## `idx bootstrap`

bootstrap IDX on a Ceramic node

```
USAGE
  $ idx bootstrap

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/bootstrap.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/bootstrap.ts)_

## `idx config:get KEY`

get a config value

```
USAGE
  $ idx config:get KEY

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/config/get.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/config/get.ts)_

## `idx config:reset KEY`

reset a config value

```
USAGE
  $ idx config:reset KEY

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/config/reset.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/config/reset.ts)_

## `idx config:set KEY VALUE`

set a config value

```
USAGE
  $ idx config:set KEY VALUE

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/config/set.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/config/set.ts)_

## `idx config:show`

show the full config

```
USAGE
  $ idx config:show

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/config/show.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/config/show.ts)_

## `idx did:create`

create a new DID

```
USAGE
  $ idx did:create

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
  -l, --label=label      label for the DID
  -s, --seed=seed        Hex-encoded seed to use for the DID, starting with `0x`
```

_See code: [src/commands/did/create.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/did/create.ts)_

## `idx did:delete DID`

delete a local DID

```
USAGE
  $ idx did:delete DID

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
  -f, --force            bypass confirmation prompt
```

_See code: [src/commands/did/delete.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/did/delete.ts)_

## `idx did:label DID [LABEL]`

manage the label for a DID

```
USAGE
  $ idx did:label DID [LABEL]

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
  -d, --delete           delete the label
```

_See code: [src/commands/did/label.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/did/label.ts)_

## `idx did:list`

list the DIDs stored locally

```
USAGE
  $ idx did:list

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/did/list.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/did/list.ts)_

## `idx help [COMMAND]`

display help for idx

```
USAGE
  $ idx help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `idx index:check DID`

check if a DID supports IDX

```
USAGE
  $ idx index:check DID

ARGUMENTS
  DID  DID or label

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/index/check.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/index/check.ts)_

## `idx index:get DID KEY`

gets the contents of a key in IDX

```
USAGE
  $ idx index:get DID KEY

ARGUMENTS
  DID  DID or label
  KEY

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/index/get.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/index/get.ts)_

## `idx index:inspect DID`

inspects the contents of an IDX document

```
USAGE
  $ idx index:inspect DID

ARGUMENTS
  DID  DID or label

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/index/inspect.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/index/inspect.ts)_

## `idx index:set DID KEY CONTENTS`

sets the contents of a key in IDX

```
USAGE
  $ idx index:set DID KEY CONTENTS

ARGUMENTS
  DID       DID or label
  KEY
  CONTENTS

OPTIONS
  -c, --ceramic=ceramic  Ceramic API URL
```

_See code: [src/commands/index/set.ts](https://github.com/ceramicstudio/idx-cli/blob/v0.1.0/src/commands/index/set.ts)_
<!-- commandsstop -->

## License

Apache-2.0 OR MIT
