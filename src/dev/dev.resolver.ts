import { Args, Field, Info, InputType, Mutation, Resolver } from '@nestjs/graphql'
import { Medicine } from '@prisma/client'
import { UserInputError } from 'apollo-server-express'
import { faker } from '@faker-js/faker'
import { Appointment } from 'src/@generated/appointment'
import { BaseResolver } from 'src/base.resolver'
import { PrismaService } from 'src/prisma.service'
import { PrescriptionCreateManyInput } from 'src/@generated/prescription'
import { InvoiceItemCreateManyInvoiceInput } from 'src/@generated/invoice-item'
import { InvoiceDiscountCreateManyInvoiceInput } from 'src/@generated/invoice-discount'
import { GraphQLResolveInfo } from 'graphql'

@InputType()
export class GeneratePrescriptionsAndInvoicesInput {
	@Field()
	appointmentIds: number
	@Field()
	prescriptionNums: number
	@Field()
	invoiceItemNums: number
	@Field()
	invoiceDiscountNums: number
}

@Resolver()
export class DevResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_return => Appointment)
	async generatePrescriptionsAndInvoices(
		@Args('generatePrescriptionsAndInvoicesInput') input: GeneratePrescriptionsAndInvoicesInput,
		@Info() info: GraphQLResolveInfo
	) {
		const { appointmentIds, prescriptionNums, invoiceItemNums, invoiceDiscountNums } = input
		const appointment = await this.prismaService.appointment.findUnique({
			where: { id: appointmentIds },
			include: {
				prescriptions: true,
				invoice: {
					include: { InvoiceDiscount: true, invoiceItems: true },
				},
			},
		})
		if (!appointment) throw new UserInputError('Appointment not found')
		if (appointment.status !== 'COMPLETED') throw new UserInputError('Appointment is not COMPLETED')

		const medicine = await this.prismaService.medicine.findMany({ take: prescriptionNums })

		const itemsPrice = this.randomPrices(invoiceItemNums, 100, 5000)
		const totalPrice = itemsPrice.reduce((p, c) => p + c, 0)
		let discountPriuce = this.randomPrices(invoiceDiscountNums, 500, 2000)
		let i = 1
		while (discountPriuce.reduce((p, c) => p + c, 0) > totalPrice) {
			discountPriuce = this.randomPrices(invoiceDiscountNums, 200, 2000 - i * 10)
			i++
		}
		const ops = [
			this.prismaService.prescription.createMany({
				data: this.generatePrescriptionsFromMedicine(medicine, appointment.id),
			}),
			this.prismaService.invoice.create({
				data: {
					total: totalPrice,
					appointmentId: appointment.id,
					paid: false,
					invoiceItems: {
						createMany: { data: this.generateInvoiceItemsFromPrice(itemsPrice) },
					},
					InvoiceDiscount: {
						createMany: { data: this.generateInvoiceDiscountsFromPrice(discountPriuce) },
					},
				},
			}),
		]
		await Promise.all(ops)
		return await this.prismaService.appointment.findUnique({
			where: { id: appointment.id },
			...this.getPrismaSelect(info),
		})
	}

	generatePrescriptionsFromMedicine(med: Medicine[], appointmentId: number): PrescriptionCreateManyInput[] {
		return med.map(med => {
			return { medicineId: med.id, amount: Math.round(Math.random() * 30 + 1), appointmentId }
		})
	}

	generateInvoiceItemsFromPrice(itemsPrice: number[]): InvoiceItemCreateManyInvoiceInput[] {
		return itemsPrice.map(price => ({
			name: faker.commerce.productName(),
			price,
			quantity: Math.round(Math.random() * 30 + 1),
		}))
	}

	generateInvoiceDiscountsFromPrice(itemsDiscount: number[]): InvoiceDiscountCreateManyInvoiceInput[] {
		return itemsDiscount.map(price => ({
			name: faker.helpers.arrayElement(['Social Security', 'Health Insurance', 'Other', 'Promotion']),
			amount: price,
		}))
	}

	randomPrices(n: number, min: number, max: number): number[] {
		return Array.from({ length: n }).map(() => Math.round((Math.random() * (max - min) + min) / 100) * 100)
	}
}
