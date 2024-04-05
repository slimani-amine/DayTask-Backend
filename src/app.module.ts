import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import databaseConfig from "./database/config/database.config";
import authConfig from "./auth/config/auth.config";
import appConfig from "./config/app.config";
import mailConfig from "./mail/config/mail.config";
import googleConfig from "./auth-google/config/google.config";
import path from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { I18nModule } from "nestjs-i18n/dist/i18n.module";
import { HeaderResolver } from "nestjs-i18n";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { MailModule } from "./mail/mail.module";
import { DataSource, DataSourceOptions } from "typeorm";
import { AllConfigType } from "./config/config.type";
import { MailerModule } from "./mailer/mailer.module";
import fileConfig from "./files/config/file.config";
import { UsersModule } from "./users/users.module";
import { FilesModule } from "./files/files.module";
import { SessionModule } from "./session/session.module";
import { ChatModule } from "./chat/chat.module";
import { ProjectsModule } from "./projects/projects.module";
import { TasksModule } from "./tasks/tasks.module";
import { MessageModule } from "./messages/message.module";
import { NotificationModule } from "./notifications/notifications.module";
import { MessagesSocketModule } from "./messages/socket/messages-socket.module";
import { NotificationsSocketModule } from "./notifications/socket/notifications-socket.module";
import { HomeModule } from "./home/home.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        googleConfig,
      ],
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow("app.fallbackLanguage", {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, "/i18n/"), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get("app.headerLanguage", {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    ProjectsModule,
    TasksModule,
    ChatModule,
    MessageModule,
    NotificationModule,
    MessagesSocketModule,
    NotificationsSocketModule,
  ],
})
export class AppModule {}
