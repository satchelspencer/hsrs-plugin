import { keyboardShortcuts } from './keys'
import { CardState, InitOptions, ReadyMessage, ShortcutMessage } from './types'

export { CardState } from './types'
export {keyboardShortcuts, Shortcut} from './keys'

export function hsrsPlugin(
  options: InitOptions,
  onState: (state: CardState) => void
): () => void {
  const { allowedOrigins } = options,
    handleMessage = (event: MessageEvent) => {
      if (allowedOrigins && !allowedOrigins.includes(event.origin)) return

      const data = event.data
      if (typeof data === 'object' && data?.type === 'state') {
        onState(data.state)
      }
    }

  const cleanupShortcuts = keyboardShortcuts((shortCut) => {
    const msg: ShortcutMessage = {
        type: 'shortcut',
        name: shortCut,
      },
      targetOrigin = allowedOrigins?.[0] || '*'
    window.parent.postMessage(msg, targetOrigin)
  })

  window.addEventListener('message', handleMessage)

  const msg: ReadyMessage = { type: 'ready' },
    targetOrigin = allowedOrigins?.[0] || '*'
  window.parent.postMessage(msg, targetOrigin)

  return () => {
    window.removeEventListener('message', handleMessage)
    cleanupShortcuts()
  }
}
