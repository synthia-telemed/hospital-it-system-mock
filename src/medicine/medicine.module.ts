import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MedicineResolver } from './medicine.resolver'
import { MedicineService } from './medicine.service'

@Module({
	providers: [MedicineService, PrismaService, MedicineResolver],
	exports: [MedicineService],
})
export class MedicineModule {}
