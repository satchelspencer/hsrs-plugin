"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsrsPlugin = hsrsPlugin;
function hsrsPlugin(options, onState) {
    const { allowedOrigins } = options, handleMessage = (event) => {
        if (allowedOrigins && !allowedOrigins.includes(event.origin))
            return;
        const data = event.data;
        if (typeof data === 'object' && (data === null || data === void 0 ? void 0 : data.type) === 'state') {
            onState(data.state);
        }
    }, handleKeyDown = (event) => {
        const msg = {
            type: 'key',
            key: event.key,
            meta: event.metaKey,
            ctrl: event.ctrlKey
        };
        const targetOrigin = (allowedOrigins === null || allowedOrigins === void 0 ? void 0 : allowedOrigins[0]) || '*';
        window.parent.postMessage(msg, targetOrigin);
    };
    window.addEventListener('message', handleMessage);
    window.addEventListener('keydown', handleKeyDown);
    const msg = { type: 'ready' }, targetOrigin = (allowedOrigins === null || allowedOrigins === void 0 ? void 0 : allowedOrigins[0]) || '*';
    window.parent.postMessage(msg, targetOrigin);
    return () => {
        window.removeEventListener('message', handleMessage);
        window.removeEventListener('keydown', handleKeyDown);
    };
}
