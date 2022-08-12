import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { BaseResolver } from 'src/base.resolver'
import { FindManyInvoiceArgs, Invoice, InvoiceCreateInput, InvoiceWhereInput } from 'src/@generated/invoice'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => Invoice)
export class InvoiceResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Invoice)
	async createInvoice(@Args('invoice') data: InvoiceCreateInput, @Info() info: GraphQLResolveInfo): Promise<Invoice> {
		return this.prismaService.invoice.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [Invoice])
	async invoices(@Args() condition: FindManyInvoiceArgs, @Info() info: GraphQLResolveInfo): Promise<Invoice[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.invoice.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => Invoice, { nullable: true })
	async invoice(@Args('where') where: InvoiceWhereInput, @Info() info: GraphQLResolveInfo): Promise<Invoice> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.invoice.findFirst({ where, ...this.getPrismaSelect(info) })
	}
}
