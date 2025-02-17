export interface CardState {
    id: string;
    value: {
        [prop: string]: string;
    };
    aliases: {
        [prop: string]: string;
    }[];
    vars: {
        [prop: string]: string;
    };
    revealed: boolean;
    property: string;
    mode: string;
}
export interface StateUpdateMessage {
    type: 'state';
    state: CardState;
}
export interface KeyEventMessage {
    type: 'key';
    key: string;
    meta: boolean;
    ctrl: boolean;
}
export interface ReadyMessage {
    type: 'ready';
}
export interface InitOptions {
    allowedOrigins?: string[];
}
export type IncomingMessage = StateUpdateMessage;
export type OutgoingMessage = ReadyMessage | KeyEventMessage;
