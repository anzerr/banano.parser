
### `Intro`
![GitHub Actions status | publish](https://github.com/anzerr/banano.parser/workflows/publish/badge.svg)

Parse network packets from banano into json or json back into network packets

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/banano.parser.git
npm install --save @anzerr/banano.parser
```

##### `Add`
Examples of usage can be found in the test director or its usage in [banano.network](https://github.com/anzerr/banano.network)

##### `Support`
| Name                  | JSON to Buffer | Buffer to JSON |
| :-------------------- | :------------- | :------------- |
| Bulk Pull             | ✓              | ✓              |
| Bulk Pull Blocks      | ✓              | ✓              |
| Confirm Ack           | ✓              | ✓              |
| Confirm Req           | ✓              | ✓              |
| Frontier Req          | ✓              | ✓              |
| Keep Alive            | ✓              | ✓              |
| Publish               | ✓              | ✓              |

##### `Notes`
BulkPullBlocks doesn't seem to work when sent to a node maybe is malformed?

In FrontierReq the param "count" doesn't seem to change how many frontiers
a node will responde with.
