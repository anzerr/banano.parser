
### `Intro`
Parse network packets from banano into json or json back into network packets

##### `Add`
How to install with npm
```shell
npm i --save https://github.com/anzerr/banano.parser.git
```
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
