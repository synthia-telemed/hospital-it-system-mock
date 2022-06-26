import { Injectable } from '@nestjs/common'
import { Medicine, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class MedicineService {
	constructor(private readonly prismaService: PrismaService) {}

	async add(medicine: Prisma.MedicineCreateInput) {
		return this.prismaService.medicine.create({ data: medicine })
	}

	async findOne(where: Prisma.MedicineWhereInput): Promise<Medicine> {
		return this.prismaService.medicine.findFirst({ where })
	}

	async findMany(condition: Prisma.MedicineFindManyArgs): Promise<Medicine[]> {
		return this.prismaService.medicine.findMany(condition)
	}
}
