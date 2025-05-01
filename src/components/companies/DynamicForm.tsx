// import React from 'react'
import { FormField } from '@/types'

interface DynamicFormProps {
  selectedCompany: string
  formFields: FormField[]
}

const DynamicForm = ({ selectedCompany, formFields }: DynamicFormProps) => {
  console.log(formFields)
  return <div>DynamicForm {selectedCompany}</div>
}

export default DynamicForm
