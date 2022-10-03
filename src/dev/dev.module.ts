import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DevResolver } from './dev.resolver'

@Module({
	providers: [PrismaService, DevResolver],
})
export class DevModule {}
