import { Patient } from './patient'
import { Doctor } from './doctor'
import { Prescription } from './prescription'
import { Invoice } from './invoice'
import { AppointmentStatus } from '@prisma/client'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class Appointment {
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty({ type: () => Patient })
	patient: Patient

	@ApiProperty({ type: String })
	patientId: string

	@ApiProperty({ type: () => Doctor })
	doctor: Doctor

	@ApiProperty({ type: Number })
	doctorId: number

	@ApiProperty({ type: Date })
	dateTime: Date

	@ApiProperty({ type: String })
	detail: string

	@ApiPropertyOptional({ type: Date })
	nextAppointment?: Date

	@ApiProperty({ enum: AppointmentStatus, enumName: 'AppointmentStatus' })
	status: AppointmentStatus = AppointmentStatus.SCHEDULED

	@ApiProperty({ isArray: true, type: () => Prescription })
	Prescription: Prescription[]

	@ApiPropertyOptional({ type: () => Invoice })
	Invoice?: Invoice

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
