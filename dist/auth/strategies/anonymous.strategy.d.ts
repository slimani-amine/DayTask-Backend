import { Strategy } from 'passport-anonymous';
declare const AnonymousStrategy_base: new (...args: any[]) => Strategy;
export declare class AnonymousStrategy extends AnonymousStrategy_base {
    constructor();
    validate(payload: unknown, request: unknown): unknown;
}
export {};
