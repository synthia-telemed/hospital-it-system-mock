import { Injectable } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

export interface NotificationMessage {
	id: string
	title: string
	body: string
	data: Record<string, string>
}

@Injectable()
export class NotificationService {
	constructor(private readonly amqpConnection: AmqpConnection) {}

	sendNotification(payload: NotificationMessage) {
		this.amqpConnection.publish('', 'push-notification', payload)
	}
}
