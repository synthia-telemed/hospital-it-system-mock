import { Injectable } from '@nestjs/common'
import { Patient } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PatientService {
	constructor(private readonly prismaSerice: PrismaService) {}

	async addPatient(patient: Patient) {
		return this.prismaSerice.patient.create({ data: patient })
	}
}
