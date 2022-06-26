import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FindManyMedicineArgs, MedicineCreateInput, MedicineWhereInput } from 'src/@generated/medicine'
import { Medicine } from 'src/@generated/medicine/medicine.model'
import { MedicineService } from './medicine.service'

@Resolver(_of => Medicine)
export class MedicineResolver {
	constructor(private readonly medicineService: MedicineService) {}

	@Mutation(_returns => Medicine)
	async createMedicine(@Args('medicine') data: MedicineCreateInput): Promise<Medicine | null> {
		return this.medicineService.add(data)
	}

	@Query(_returns => Medicine, { nullable: true })
	async medicine(@Args('where') where: MedicineWhereInput): Promise<Medicine> {
		return this.medicineService.findOne(where)
	}

	@Query(_returns => [Medicine])
	async medicines(@Args() condition: FindManyMedicineArgs): Promise<Medicine[]> {
		return this.medicineService.findMany(condition)
	}
}
