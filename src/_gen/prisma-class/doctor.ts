import { Appointment } from './appointment'
import { ApiProperty } from '@nestjs/swagger'

export class Doctor {
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty({ type: String })
	initial_th: string

	@ApiProperty({ type: String })
	firstname_th: string

	@ApiProperty({ type: String })
	lastname_th: string

	@ApiProperty({ type: String })
	initial_en: string

	@ApiProperty({ type: String })
	firstname_en: string

	@ApiProperty({ type: String })
	lastname_en: string

	@ApiProperty({ type: String })
	position: string

	@ApiProperty({ isArray: true, type: () => Appointment })
	Appointment: Appointment[]

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
