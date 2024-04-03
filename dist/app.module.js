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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const database_config_1 = __importDefault(require("./database/config/database.config"));
const auth_config_1 = __importDefault(require("./auth/config/auth.config"));
const app_config_1 = __importDefault(require("./config/app.config"));
const mail_config_1 = __importDefault(require("./mail/config/mail.config"));
const google_config_1 = __importDefault(require("./auth-google/config/google.config"));
const path_1 = __importDefault(require("path"));
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const i18n_module_1 = require("nestjs-i18n/dist/i18n.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const mail_module_1 = require("./mail/mail.module");
const home_module_1 = require("./home/home.module");
const typeorm_2 = require("typeorm");
const mailer_module_1 = require("./mailer/mailer.module");
const file_config_1 = __importDefault(require("./routes/files/config/file.config"));
const users_module_1 = require("./routes/users/users.module");
const files_module_1 = require("./routes/files/files.module");
const session_module_1 = require("./routes/session/session.module");
const chat_module_1 = require("./routes/chat/chat.module");
const projects_module_1 = require("./routes/projects/projects.module");
const tasks_module_1 = require("./routes/tasks/tasks.module");
const message_module_1 = require("./routes/messages/message.module");
const notifications_module_1 = require("./routes/notifications/notifications.module");
const messages_socket_module_1 = require("./routes/messages/socket/messages-socket.module");
const notifications_socket_module_1 = require("./routes/notifications/socket/notifications-socket.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    database_config_1.default,
                    auth_config_1.default,
                    app_config_1.default,
                    mail_config_1.default,
                    file_config_1.default,
                    google_config_1.default,
                ],
                envFilePath: ['.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_config_service_1.TypeOrmConfigService,
                dataSourceFactory: async (options) => {
                    return new typeorm_2.DataSource(options).initialize();
                },
            }),
            i18n_module_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
                        infer: true,
                    }),
                    loaderOptions: { path: path_1.default.join(__dirname, '/i18n/'), watch: true },
                }),
                resolvers: [
                    {
                        use: nestjs_i18n_1.HeaderResolver,
                        useFactory: (configService) => {
                            return [
                                configService.get('app.headerLanguage', {
                                    infer: true,
                                }),
                            ];
                        },
                        inject: [config_1.ConfigService],
                    },
                ],
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            files_module_1.FilesModule,
            auth_module_1.AuthModule,
            session_module_1.SessionModule,
            mail_module_1.MailModule,
            mailer_module_1.MailerModule,
            home_module_1.HomeModule,
            projects_module_1.ProjectsModule,
            tasks_module_1.TasksModule,
            chat_module_1.ChatModule,
            message_module_1.MessageModule,
            notifications_module_1.NotificationModule,
            messages_socket_module_1.MessagesSocketModule,
            notifications_socket_module_1.NotificationsSocketModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map