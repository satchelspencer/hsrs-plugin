"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboardShortcuts = void 0;
exports.hsrsPlugin = hsrsPlugin;
const keys_1 = require("./keys");
var keys_2 = require("./keys");
Object.defineProperty(exports, "keyboardShortcuts", { enumerable: true, get: function () { return keys_2.keyboardShortcuts; } });
function hsrsPlugin(options, onState) {
    const { allowedOrigins } = options, handleMessage = (event) => {
        if (allowedOrigins && !allowedOrigins.includes(event.origin))
            return;
        const data = event.data;
        if (typeof data === 'object' && (data === null || data === void 0 ? void 0 : data.type) === 'state') {
            onState(data.state);
        }
    };
    const cleanupShortcuts = (0, keys_1.keyboardShortcuts)((shortCut) => {
        const msg = {
            type: 'shortcut',
            name: shortCut,
        }, targetOrigin = (allowedOrigins === null || allowedOrigins === void 0 ? void 0 : allowedOrigins[0]) || '*';
        window.parent.postMessage(msg, targetOrigin);
    });
    window.addEventListener('message', handleMessage);
    const msg = { type: 'ready' }, targetOrigin = (allowedOrigins === null || allowedOrigins === void 0 ? void 0 : allowedOrigins[0]) || '*';
    window.parent.postMessage(msg, targetOrigin);
    return () => {
        window.removeEventListener('message', handleMessage);
        cleanupShortcuts();
    };
}
