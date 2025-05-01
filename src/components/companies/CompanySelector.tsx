// import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CompanySelectorProps {
  companyKeys: string[]
  selectedCompany: string
  onSelectCompany: (companyKey: string) => void
}
const CompanySelector = ({
  companyKeys,
  selectedCompany,
  onSelectCompany,
}: CompanySelectorProps) => {
  return (
    <Select onValueChange={onSelectCompany} value={selectedCompany}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Select a Company" />
      </SelectTrigger>
      <SelectContent>
        {companyKeys.map((companyKey) => (
          <SelectItem
            className="cursor-pointer"
            key={companyKey}
            value={companyKey}
          >
            {companyKey}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CompanySelector
