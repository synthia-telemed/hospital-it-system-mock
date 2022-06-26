import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppController } from './app.controller'
import { PatientModule } from './patient/patient.module'
import { DoctorModule } from './doctor/doctor.module'
import { MedicineModule } from './medicine/medicine.module'
import { PrescriptionModule } from './prescription/prescription.module'
import { InvoiceModule } from './invoice/invoice.module'
import { AppointmentModule } from './appointment/appointment.module';

@Module({
	imports: [
		PatientModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
			autoSchemaFile: true,
			sortSchema: true,
		}),
		DoctorModule,
		MedicineModule,
		PrescriptionModule,
		InvoiceModule,
		AppointmentModule,
	],
	controllers: [AppController],
})
export class AppModule {}
