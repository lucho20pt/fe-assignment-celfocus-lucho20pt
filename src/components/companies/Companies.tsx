import React from 'react'
import CompanySelector from '@/components/companies/CompanySelector'
import DynamicForm from '@/components/companies/DynamicForm'

import useCompanyConfig from '@/hooks/useCompanyConfig'

/**
 * Orchestrates the display and interaction for selecting a company and viewing its dynamic form.
 *
 * Fetches company configuration data using `useCompanyConfig`.
 * Renders a `CompanySelector` to choose a company.
 * Manages the state for the currently selected company.
 * Conditionally renders the `DynamicForm` component with the appropriate configuration for the selected company.
 */

const Companies: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = React.useState<string>('') // Store the key/name of the selected company
  const { data: configData, isLoading, isError, error } = useCompanyConfig()

  // Handler for when a company is selected in the dropdown
  const handleCompanySelect = (companyKey: string) => {
    setSelectedCompany(companyKey)
  }

  // Handle loading and error states from React Query
  if (isLoading) {
    return <p>Loading company configurations...</p>
  }

  if (isError) {
    return <p>Error loading configurations: {error.message}</p>
  }

  // Extract company names/keys for the selector
  const companyKeys = configData ? Object.keys(configData) : []

  // Get the form fields for the currently selected company
  const selectedCompanyFormFields =
    configData && selectedCompany ? configData[selectedCompany]?.FormFields : []

  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <h2 className="text-2xl font-bold underline">Dynamic Companies Forms </h2>

      <CompanySelector
        companyKeys={companyKeys}
        selectedCompany={selectedCompany}
        onSelectCompany={handleCompanySelect}
      />

      {/* Conditionally render the DynamicForm only when a company is selected */}
      {selectedCompany && selectedCompanyFormFields && (
        <DynamicForm
          key={selectedCompany}
          selectedCompany={selectedCompany}
          formFields={selectedCompanyFormFields}
        /> // Use key to reset form state on company change
      )}
    </section>
  )
}

export default Companies
