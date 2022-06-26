import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import {
	FindManyPrescriptionArgs,
	Prescription,
	PrescriptionCreateInput,
	PrescriptionWhereInput,
} from 'src/@generated/prescription'
import { PrismaService } from 'src/prisma.service'
import { BaseResolver } from 'src/@generated/base.resolver'

@Resolver(_of => Prescription)
export class PrescriptionResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Prescription)
	async createPrescription(
		@Args('prescription') data: PrescriptionCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Prescription> {
		const select = this.getPrismaSelect(info)
		return this.prismaService.prescription.create({ data, ...select })
	}

	@Query(_returns => Prescription, { nullable: true })
	async prescription(
		@Args('where') where: PrescriptionWhereInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Prescription> {
		const select = this.getPrismaSelect(info)
		return this.prismaService.prescription.findFirst({ where, ...select })
	}

	@Query(_returns => [Prescription])
	async prescriptions(
		@Args() condition: FindManyPrescriptionArgs,
		@Info() info: GraphQLResolveInfo
	): Promise<Prescription[]> {
		const select = this.getPrismaSelect(info)
		return this.prismaService.prescription.findMany({ ...condition, ...select })
	}
}
