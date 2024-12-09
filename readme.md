# hsrs-plugin

## Installation
```bash
npm install hsrs-plugin
```
## Usage
```ts
import { hsrsPlugin, CardState } from 'hsrs-plugin'

const destroy = hsrsPlugin(
  { allowedOrigins: ['https://example.com'] },
  (state: CardState) => {
    console.log('Received state:', state)
    // update your UI...
  }
)

// later, if you need to clean up
destroy()
```
