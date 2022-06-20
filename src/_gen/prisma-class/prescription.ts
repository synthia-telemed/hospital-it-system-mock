import { Medicine } from './medicine'
import { Appointment } from './appointment'
import { ApiProperty } from '@nestjs/swagger'

export class Prescription {
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty({ isArray: true, type: () => Medicine })
	medicine: Medicine[]

	@ApiProperty({ type: () => Appointment })
	appointment: Appointment

	@ApiProperty({ type: Number })
	appointmentId: number

	@ApiProperty({ type: Number })
	amount: number

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
