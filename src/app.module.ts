import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { LoggerModule } from 'nestjs-pino'
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware'
import { ConfigModule } from '@nestjs/config'
import { configLoader } from './config/config-loader'
import { envSchema } from './config/env-schema'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV === 'dev'
          ? {
              transport: {
                target: 'pino-pretty',
                options: {
                  messageKey: 'message',
                },
              },
              messageKey: 'message',
              customProps: (req: any) => {
                return {
                  correlationId: req[CORRELATION_ID_HEADER],
                }
              },
              autoLogging: false,
              serializers: {
                req: () => {
                  return undefined
                },
              },
            }
          : undefined,
    }),
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: envSchema,
    }),
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*')
  }
}
