import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PatientResolver } from './patient.resolver'
import { PatientService } from './patient.service'

@Module({
	providers: [PatientService, PrismaService, PatientResolver],
})
export class PatientModule {}
