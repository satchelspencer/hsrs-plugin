import { CardState, InitOptions } from './types';
export { CardState } from './types';
export declare function hsrsPlugin(options: InitOptions, onState: (state: CardState) => void): () => void;
