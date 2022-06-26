import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Doctor, DoctorCreateInput, DoctorWhereInput, FindManyDoctorArgs } from 'src/@generated/doctor'
import { DoctorService } from './doctor.service'

@Resolver(_of => Doctor)
export class DoctorResolver {
	constructor(private readonly doctorService: DoctorService) {}

	@Query(_returns => Doctor, { nullable: true })
	async doctor(@Args('where') where: DoctorWhereInput): Promise<Doctor> {
		return this.doctorService.findOne(where)
	}

	@Query(_returns => [Doctor])
	async doctors(@Args() condition: FindManyDoctorArgs): Promise<any> {
		return this.doctorService.findMany(condition)
	}

	@Mutation(_returns => Doctor)
	async createDoctor(@Args('doctor') data: DoctorCreateInput): Promise<Doctor | null> {
		return this.doctorService.add(data)
	}
}
