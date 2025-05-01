/**
 *  * Why did i choose Zod?
 * - Zod provides a declarative way to define schemas that serve as both runtime validators and TypeScript type definitions.
 * - It eliminates the need to manually define and maintain separate interfaces for validation and type-checking.
 * - Zod's `parse` method ensures that data conforms to the schema at runtime, throwing errors if validation fails.
 * - This approach ensures that application is both type-safe and runtime-safe.
 *
 * Single Source of Truth:
 * The zod schemas define both the runtime validation and the TypeScript types, ensuring consistency.
 *
 * Scalability:
 * As the project grows, you only need to update the zod schemas, and the inferred types will automatically stay in sync.
 *
 * Maintainability:
 * You avoid duplicating effort by not maintaining separate manually defined types and runtime validation logic.
 *
 * Runtime Safety:
 * The zod schemas ensure that data is validated at runtime, reducing the risk of runtime errors caused by invalid data.
 *
 */

import { z } from 'zod'

// Define the schema for FormFieldType
export const FormFieldTypeSchema = z.object({
  /**
   * Label: The label for the form field (e.g., "Name", "Email").
   * Type: The type of the form field, restricted to specific values (e.g., 'text', 'email').
   * Validation: Optional validation rules for the field, such as required or a regex pattern.
   * Options: Optional array of string options for fields like dropdowns or multiselects.
   */
  Label: z.string(),
  Type: z.enum(['text', 'email', 'number', 'date', 'textarea', 'multiselect']),
  Validation: z
    .object({
      required: z.boolean().optional(),
      pattern: z.string().optional(),
    })
    .optional(),
  Options: z.array(z.string()).optional(),
})

// Define the schema for CompanyConfig
export const CompanyConfigSchema = z.record(
  z.object({
    /**
     * FormFields: An array of form fields that define the structure of a company's form configuration.
     */
    FormFields: z.array(FormFieldTypeSchema), // Use the renamed schema here
  })
)

// Infer types from zod schemas
/**
 * FormFieldType:
 * - Inferred from FormFieldTypeSchema.
 * - Represents the structure of a single form field.
 */
export type FormFieldType = z.infer<typeof FormFieldTypeSchema> // Rename the inferred type

/**
 * CompanyConfig:
 * - Inferred from CompanyConfigSchema.
 * - Represents the structure of the company configuration, where each key is a company name
 *   and the value is an object containing an array of form fields.
 */
// Note: CompanyConfig now implicitly uses FormFieldType via FormFieldTypeSchema.
export type CompanyConfig = z.infer<typeof CompanyConfigSchema>

//
// export interface FormField {
//   Label: string
//   Type: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'multiselect'
//   Validation?: { required?: boolean; pattern?: string }
//   Options?: string[]
// }

// export interface CompanyConfig {
//   [key: string]: { FormFields: FormFieldType[] } // Update comment if needed
// }
