import { Injectable } from '@nestjs/common'
import { Patient, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PatientService {
	constructor(private readonly prismaSerice: PrismaService) {}

	async addPatient(patient: Prisma.PatientCreateInput) {
		return this.prismaSerice.patient.create({ data: patient })
	}

	async findOne(where: Prisma.PatientWhereInput): Promise<Patient> {
		return this.prismaSerice.patient.findFirst({ where })
	}

	async findMany(condition: Prisma.PatientFindManyArgs): Promise<Patient[]> {
		return this.prismaSerice.patient.findMany(condition)
	}
}
