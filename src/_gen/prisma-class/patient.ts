import { Appointment } from './appointment'
import { BloodType } from '@prisma/client'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsEmpty, IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class Patient {
	@ApiProperty({ type: String })
	@IsEmpty()
	id: string

	@ApiProperty({ type: String })
	@IsString()
	initial_th: string

	@ApiProperty({ type: String })
	@IsString()
	firstname_th: string

	@ApiProperty({ type: String })
	@IsString()
	lastname_th: string

	@ApiProperty({ type: String })
	@IsString()
	initial_en: string

	@ApiProperty({ type: String })
	@IsString()
	firstname_en: string

	@ApiProperty({ type: String })
	@IsString()
	lastname_en: string

	@ApiProperty({ type: String })
	@IsString()
	nationality: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	@Length(13, 13)
	nationalId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	passportId?: string

	@ApiProperty({ type: String })
	@IsString()
	@Length(10, 10)
	phoneNumber: string

	@ApiProperty({ type: Number })
	@IsNumber()
	weight: number

	@ApiProperty({ type: Number })
	@IsNumber()
	height: number

	@ApiProperty({ type: Date })
	@IsDateString()
	birthDate: Date

	@ApiProperty({ enum: BloodType, enumName: 'BloodType' })
	@IsEnum(BloodType)
	bloodType: BloodType

	@ApiProperty({ isArray: true, type: () => Appointment })
	@IsEmpty()
	Appointment: Appointment[]

	@ApiProperty({ type: Date })
	@IsEmpty()
	createdAt: Date

	@ApiProperty({ type: Date })
	@IsEmpty()
	updatedAt: Date
}
