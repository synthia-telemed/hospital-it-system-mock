import { Appointment } from './appointment'
import { InvoiceItem } from './invoice_item'
import { ApiProperty } from '@nestjs/swagger'

export class Invoice {
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty({ type: () => Appointment })
	appointment: Appointment

	@ApiProperty({ type: Number })
	appointmentId: number

	@ApiProperty({ type: Boolean })
	paid: boolean

	@ApiProperty({ type: Number })
	total: number

	@ApiProperty({ isArray: true, type: () => InvoiceItem })
	InvoiceItem: InvoiceItem[]

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
