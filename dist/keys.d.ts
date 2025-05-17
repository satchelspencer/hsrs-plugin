export type Shortcut = '1' | '2' | '3' | '4' | 'next' | 'undo';
export declare function keyboardShortcuts(cb: (shortCut: Shortcut) => void): () => void;
