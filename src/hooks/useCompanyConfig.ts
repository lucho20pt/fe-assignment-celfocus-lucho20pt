import { useQuery } from '@tanstack/react-query'
import { CompanyConfig } from '@/types'
import fetchCompanyConfig from '@/services/companyService'

// React Query hook to fetch and cache the company configuration
const useCompanyConfig = () => {
  return useQuery<CompanyConfig, Error>({
    // Explicitly type the error as Error
    queryKey: ['companyConfig'], // Unique key for caching
    queryFn: fetchCompanyConfig, // Function to fetch the data
    staleTime: 1000 * 60 * 5, // Optional: Cache data for 5 minutes
    retry: 2, // Optional: Retry failed requests up to 2 times
  })
}

export default useCompanyConfig
