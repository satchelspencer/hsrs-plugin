import { CardState, InitOptions, KeyEventMessage, ReadyMessage } from './types'

export { CardState } from './types'

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
    },
    handleKeyDown = (event: KeyboardEvent) => {
      const msg: KeyEventMessage = {
        type: 'key',
        key: event.key,
        meta: event.metaKey,
        ctrl: event.ctrlKey
      }

      const targetOrigin = allowedOrigins?.[0] || '*'
      window.parent.postMessage(msg, targetOrigin)
    }

  window.addEventListener('message', handleMessage)
  window.addEventListener('keydown', handleKeyDown)

  const msg: ReadyMessage = { type: 'ready' },
    targetOrigin = allowedOrigins?.[0] || '*'
  window.parent.postMessage(msg, targetOrigin)

  return () => {
    window.removeEventListener('message', handleMessage)
    window.removeEventListener('keydown', handleKeyDown)
  }
}
