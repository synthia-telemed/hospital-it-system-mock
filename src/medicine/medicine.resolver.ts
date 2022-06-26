import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FindManyMedicineArgs, MedicineCreateInput, MedicineWhereInput } from 'src/@generated/medicine'
import { Medicine } from 'src/@generated/medicine/medicine.model'
import { MedicineService } from './medicine.service'

@Resolver(of => Medicine)
export class MedicineResolver {
	constructor(private readonly medicineService: MedicineService) {}

	@Mutation(returns => Medicine)
	async createMedicine(@Args('medicine') data: MedicineCreateInput): Promise<Medicine | null> {
		return this.medicineService.add(data)
	}

	@Query(returns => Medicine, { nullable: true })
	async medicine(@Args('where') where: MedicineWhereInput): Promise<Medicine> {
		return this.medicineService.findOne(where)
	}

	@Query(returns => [Medicine])
	async medicines(@Args() condition: FindManyMedicineArgs): Promise<Medicine[]> {
		return this.medicineService.findMany(condition)
	}
}
