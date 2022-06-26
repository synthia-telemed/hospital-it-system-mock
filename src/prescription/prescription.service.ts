import { Injectable } from '@nestjs/common'
import { Prisma, Prescription } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PrescriptionService {
	constructor(private readonly prismaService: PrismaService) {}

	async add(prescription: Prisma.PrescriptionCreateInput) {
		return this.prismaService.prescription.create({ data: prescription })
	}

	async findOne(where: Prisma.PrescriptionWhereInput): Promise<Prescription> {
		return this.prismaService.prescription.findFirst({ where })
	}

	async findMany(condition: Prisma.PrescriptionFindManyArgs): Promise<Prescription[]> {
		return this.prismaService.prescription.findMany(condition)
	}
}
