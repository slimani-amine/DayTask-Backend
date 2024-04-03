"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvePromisesInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const deep_resolver_1 = __importDefault(require("./deep-resolver"));
let ResolvePromisesInterceptor = class ResolvePromisesInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => (0, deep_resolver_1.default)(data)));
    }
};
exports.ResolvePromisesInterceptor = ResolvePromisesInterceptor;
exports.ResolvePromisesInterceptor = ResolvePromisesInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResolvePromisesInterceptor);
//# sourceMappingURL=serializer.interceptor.js.map