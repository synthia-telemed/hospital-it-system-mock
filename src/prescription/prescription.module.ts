import { Module } from '@nestjs/common'
import { MedicineModule } from 'src/medicine/medicine.module'
import { PrismaService } from 'src/prisma.service'
import { PrescriptionResolver } from './prescription.resolver'
import { PrescriptionService } from './prescription.service'

@Module({
	imports: [MedicineModule],
	providers: [PrescriptionService, PrismaService, PrescriptionResolver],
})
export class PrescriptionModule {}
