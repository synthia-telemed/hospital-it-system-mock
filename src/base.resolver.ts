import { PrismaSelect } from '@paljs/plugins'
import { GraphQLResolveInfo } from 'graphql'

export class BaseResolver {
	getPrismaSelect(info: GraphQLResolveInfo) {
		return new PrismaSelect(info).value
	}
}
