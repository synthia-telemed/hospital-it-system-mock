import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		RabbitMQModule.forRootAsync(RabbitMQModule, {
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const rabbitmqURL = configService.get('RABBITMQ_URL')
				return {
					uri: rabbitmqURL,
				}
			},
		}),
	],
	providers: [NotificationService],
	exports: [NotificationService],
})
export class NotificationModule {}
