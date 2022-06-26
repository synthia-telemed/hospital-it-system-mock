import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppController } from './app.controller'
import { PatientModule } from './patient/patient.module'
import { DoctorModule } from './doctor/doctor.module'
import { MedicineModule } from './medicine/medicine.module'

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
	],
	controllers: [AppController],
})
export class AppModule {}
