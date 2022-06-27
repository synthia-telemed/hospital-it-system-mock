import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import {
	Appointment,
	AppointmentCreateInput,
	AppointmentWhereInput,
	FindManyAppointmentArgs,
} from 'src/@generated/appointment'
import { BaseResolver } from 'src/base.resolver'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => Appointment)
export class AppointmentResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Appointment)
	async createAppointment(
		@Args('appointment') data: AppointmentCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Appointment> {
		return this.prismaService.appointment.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [Appointment])
	async appointments(
		@Args() condition: FindManyAppointmentArgs,
		@Info() info: GraphQLResolveInfo
	): Promise<Appointment[]> {
		return this.prismaService.appointment.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => Appointment, { nullable: true })
	async appointment(
		@Args('where') where: AppointmentWhereInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Appointment | null> {
		return this.prismaService.appointment.findFirst({ where, ...this.getPrismaSelect(info) })
	}
}
