"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = __importDefault(require("node:fs/promises"));
const config_1 = require("@nestjs/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
let MailerService = class MailerService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer_1.default.createTransport({
            host: configService.get('mail.host', { infer: true }),
            port: configService.get('mail.port', { infer: true }),
            ignoreTLS: configService.get('mail.ignoreTLS', { infer: true }),
            secure: configService.get('mail.secure', { infer: true }),
            requireTLS: configService.get('mail.requireTLS', { infer: true }),
            auth: {
                user: configService.get('mail.user', { infer: true }),
                pass: configService.get('mail.password', { infer: true }),
            },
        });
    }
    async sendMail({ templatePath, context, ...mailOptions }) {
        let html;
        if (templatePath) {
            const template = await promises_1.default.readFile(templatePath, 'utf-8');
            html = handlebars_1.default.compile(template, {
                strict: true,
            })(context);
        }
        await this.transporter.sendMail({
            ...mailOptions,
            from: mailOptions.from
                ? mailOptions.from
                : `"${this.configService.get('mail.defaultName', {
                    infer: true,
                })}" <${this.configService.get('mail.defaultEmail', {
                    infer: true,
                })}>`,
            html: mailOptions.html ? mailOptions.html : html,
        });
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map