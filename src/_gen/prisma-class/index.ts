import { Patient as _Patient } from './patient'
import { Doctor as _Doctor } from './doctor'
import { Appointment as _Appointment } from './appointment'
import { Medicine as _Medicine } from './medicine'
import { Prescription as _Prescription } from './prescription'
import { Invoice as _Invoice } from './invoice'
import { InvoiceItem as _InvoiceItem } from './invoice_item'

export namespace PrismaModel {
	export class Patient extends _Patient {}
	export class Doctor extends _Doctor {}
	export class Appointment extends _Appointment {}
	export class Medicine extends _Medicine {}
	export class Prescription extends _Prescription {}
	export class Invoice extends _Invoice {}
	export class InvoiceItem extends _InvoiceItem {}

	export const extraModels = [Patient, Doctor, Appointment, Medicine, Prescription, Invoice, InvoiceItem]
}
