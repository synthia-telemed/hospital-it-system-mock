import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { BaseResolver } from 'src/base.resolver'
import { Doctor, DoctorCreateInput, DoctorWhereInput, FindManyDoctorArgs } from 'src/@generated/doctor'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => Doctor)
export class DoctorResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Query(_returns => Doctor, { nullable: true })
	async doctor(@Args('where') where: DoctorWhereInput, @Info() info: GraphQLResolveInfo): Promise<Doctor> {
		return this.prismaService.doctor.findFirst({ where, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [Doctor])
	async doctors(@Args() condition: FindManyDoctorArgs, @Info() info: GraphQLResolveInfo): Promise<any> {
		return this.prismaService.doctor.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}

	@Mutation(_returns => Doctor)
	async createDoctor(
		@Args('doctor') data: DoctorCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Doctor | null> {
		return this.prismaService.doctor.create({ data, ...this.getPrismaSelect(info) })
	}
}
