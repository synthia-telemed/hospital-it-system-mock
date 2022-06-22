import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppController } from './app.controller'
import { PatientModule } from './patient/patient.module'

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
	],
	controllers: [AppController],
})
export class AppModule {}
