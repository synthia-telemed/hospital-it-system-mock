import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { InvoiceItemResolver } from './invoice-item.resolver'
import { InvoiceResolver } from './invoice.resolver'

@Module({
	providers: [InvoiceItemResolver, InvoiceResolver, PrismaService],
})
export class InvoiceModule {}
