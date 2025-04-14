type PropMap = { [prop: string]: string }

export interface CardState {
  id: string
  value: PropMap
  next?: PropMap
  aliases: PropMap[]
  vars: PropMap
  revealed: boolean
  property: string
  mode: string
}

export interface StateUpdateMessage {
  type: 'state'
  state: CardState
}

export interface KeyEventMessage {
  type: 'key'
  key: string
  meta: boolean
  ctrl: boolean
}

export interface ReadyMessage {
  type: 'ready'
}

export interface InitOptions {
  allowedOrigins?: string[]
}

export type IncomingMessage = StateUpdateMessage

export type OutgoingMessage = ReadyMessage | KeyEventMessage
