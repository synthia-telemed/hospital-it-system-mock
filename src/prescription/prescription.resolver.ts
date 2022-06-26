import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Medicine } from 'src/@generated/medicine'
import {
	FindManyPrescriptionArgs,
	Prescription,
	PrescriptionCreateInput,
	PrescriptionWhereInput,
} from 'src/@generated/prescription'
import { MedicineService } from 'src/medicine/medicine.service'
import { PrescriptionService } from './prescription.service'

@Resolver(_of => Prescription)
export class PrescriptionResolver {
	constructor(
		private readonly prescriptionService: PrescriptionService,
		private readonly medicineService: MedicineService
	) {}

	@Mutation(_returns => Prescription)
	async createPrescription(@Args('prescription') data: PrescriptionCreateInput): Promise<Prescription> {
		return this.prescriptionService.add(data)
	}

	@Query(_returns => Prescription, { nullable: true })
	async prescription(@Args('where') where: PrescriptionWhereInput): Promise<Prescription> {
		return this.prescriptionService.findOne(where)
	}

	@Query(_returns => [Prescription])
	async prescriptions(@Args() condition: FindManyPrescriptionArgs): Promise<Prescription[]> {
		return this.prescriptionService.findMany(condition)
	}

	@ResolveField(_returns => Medicine)
	async medicine(@Parent() { medicineId }: Prescription): Promise<Medicine> {
		return this.medicineService.findOne({ id: medicineId })
	}
}
