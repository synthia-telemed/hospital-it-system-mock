import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DoctorResolver } from './doctor.resolver'
import { DoctorService } from './doctor.service'

@Module({
	providers: [DoctorService, PrismaService, DoctorResolver],
})
export class DoctorModule {}
