import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FindManyPatientArgs, Patient, PatientCreateInput, PatientWhereInput } from 'src/@generated/patient'
import { PatientService } from './patient.service'

@Resolver(_of => Patient)
export class PatientResolver {
	constructor(private readonly patientService: PatientService) {}

	@Mutation(_returns => Patient)
	async createPatient(@Args('patient') data: PatientCreateInput): Promise<Patient | null> {
		return this.patientService.add(data)
	}

	@Query(_returns => Patient, { nullable: true })
	async patient(@Args('where') where: PatientWhereInput): Promise<Patient> {
		return this.patientService.findOne(where)
	}
	@Query(_returns => [Patient])
	async patients(@Args() condition: FindManyPatientArgs): Promise<any> {
		return this.patientService.findMany(condition)
	}
}
