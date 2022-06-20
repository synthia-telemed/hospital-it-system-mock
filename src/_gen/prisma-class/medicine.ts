import { Prescription } from './prescription'
import { ApiProperty } from '@nestjs/swagger'

export class Medicine {
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: String })
	description: string

	@ApiProperty({ isArray: true, type: () => Prescription })
	Prescription: Prescription[]

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
