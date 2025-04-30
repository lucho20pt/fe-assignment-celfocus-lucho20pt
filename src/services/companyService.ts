import { CompanyConfig, CompanyConfigSchema } from '@/types'

// Fetch the company configuration JSON file using fetch
const fetchCompanyConfig = async (): Promise<CompanyConfig> => {
  const response = await fetch('/companies.json') // Adjust the path if needed
  if (!response.ok) {
    throw new Error('Failed to fetch company configuration')
  }
  const data = await response.json()
  return CompanyConfigSchema.parse(data) // Validate the JSON data at runtime
}

export default fetchCompanyConfig
