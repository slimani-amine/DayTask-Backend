"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function deepResolvePromises(input) {
    if (input instanceof Promise) {
        return await input;
    }
    if (Array.isArray(input)) {
        const resolvedArray = await Promise.all(input.map(deepResolvePromises));
        return resolvedArray;
    }
    if (input instanceof Date) {
        return input;
    }
    if (typeof input === 'object' && input !== null) {
        const keys = Object.keys(input);
        const resolvedObject = {};
        for (const key of keys) {
            const resolvedValue = await deepResolvePromises(input[key]);
            resolvedObject[key] = resolvedValue;
        }
        return resolvedObject;
    }
    return input;
}
exports.default = deepResolvePromises;
//# sourceMappingURL=deep-resolver.js.map