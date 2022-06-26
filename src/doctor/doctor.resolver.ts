import { Args, Mutation, Query } from '@nestjs/graphql'
import { Doctor, DoctorCreateInput, DoctorWhereInput, FindManyDoctorArgs } from 'src/@generated/doctor'
import { DoctorService } from './doctor.service'

export class DoctorResolver {
	constructor(private readonly doctorService: DoctorService) {}

	@Query(returns => Doctor, { nullable: true })
	async doctor(@Args('where') where: DoctorWhereInput): Promise<Doctor> {
		return this.doctorService.findOne(where)
	}

	@Query(returns => [Doctor])
	async doctors(@Args() condition: FindManyDoctorArgs): Promise<any> {
		return this.doctorService.findMany(condition)
	}

	@Mutation(returns => Doctor)
	async createDoctor(@Args('doctor') data: DoctorCreateInput): Promise<Doctor | null> {
		return this.doctorService.add(data)
	}
}
