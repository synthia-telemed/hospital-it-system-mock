import { Injectable } from '@nestjs/common'
import { Doctor, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class DoctorService {
	constructor(private readonly prismaService: PrismaService) {}

	async findOne(where: Prisma.DoctorWhereInput): Promise<Doctor> {
		return this.prismaService.doctor.findFirst({ where })
	}

	async findMany(condition: Prisma.DoctorFindManyArgs): Promise<Doctor[]> {
		return this.prismaService.doctor.findMany(condition)
	}

	async addDoctor(doctor: Prisma.DoctorCreateInput) {
		return this.prismaService.doctor.create({ data: doctor })
	}
}
