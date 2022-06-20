import { Invoice } from './invoice'
import { ApiProperty } from '@nestjs/swagger'

export class InvoiceItem {
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: Number })
	price: number

	@ApiProperty({ type: Number })
	quantity: number

	@ApiProperty({ type: () => Invoice })
	Invoice: Invoice

	@ApiProperty({ type: Number })
	invoiceId: number

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
