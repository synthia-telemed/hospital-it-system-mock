import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Patient, PatientCreateInput, PatientWhereInput } from 'src/@generated/patient'
import { PatientService } from './patient.service'

@Resolver(of => Patient)
export class PatientResolver {
	constructor(private readonly patientService: PatientService) {}

	@Mutation(returns => Patient)
	async createPatient(@Args('patient') data: PatientCreateInput): Promise<Patient | null> {
		return this.patientService.addPatient(data)
	}

	@Query(() => Patient, { nullable: true })
	async patient(@Args('where') where: PatientWhereInput): Promise<Patient> {
		return this.patientService.findOne(where)
	}
}
