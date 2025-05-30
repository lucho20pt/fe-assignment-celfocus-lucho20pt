import React from 'react'
import { FormFieldType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { generateFieldName } from '@/utils/formUtils'

interface DynamicFormProps {
  selectedCompany: string
  formFields: FormFieldType[]
}

/**
 * Renders a dynamic form based on a configuration provided via `formFields`.
 *
 * Features:
 * - Dynamically generates a Zod validation schema and default values.
 * - Uses react-hook-form for state management and validation via zodResolver.
 * - Renders appropriate shadcn/ui input components based on field type.
 * - Handles required fields and pattern validation.
 * - Uses generated field names for robustness.
 *
 * @param selectedCompany The identifier for the currently selected company (used for context in submission).
 * @param formFields An array defining the structure and validation for each form field.
 */

const DynamicForm = ({ selectedCompany, formFields }: DynamicFormProps) => {
  // --- Dynamically build the Zod schema ---
  const formSchema = React.useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {}

    formFields.forEach((field) => {
      const fieldName = generateFieldName(field.Label) // Generate safe name
      let zodType: z.ZodTypeAny

      // Determine base Zod type
      switch (field.Type) {
        case 'email':
          zodType = z.string().email({ message: 'Invalid email address' })
          break
        case 'number':
          if (field.Validation?.required) {
            zodType = z
              .string({
                // Message if the initial value is null/undefined
                required_error: `${field.Label} is required`,
              })
              .min(1, { message: `${field.Label} is required` }) // Message if the string is ""
              .pipe(
                z.coerce.number({
                  // Message if coercion fails (e.g., input is "abc")
                  invalid_type_error: `${field.Label} must be a number`,
                })
              )
          } else {
            // For optional numbers: Allow empty string, map it to undefined, then coerce & make optional.
            zodType = z.string().transform((val) => (val === '' ? undefined : val)).pipe(z.coerce.number().optional())
          }
          break
        case 'date':
          // Basic string validation for date, can be enhanced
          zodType = z.string()
          break
        case 'select':
        case 'textarea':
        case 'text':
        default:
          zodType = z.string()
          break
      }

      // Apply required validation (Primary check for strings, handled within 'number' case now)
      if (field.Validation?.required) {
        // Apply min(1) to string-based types *unless* it's handled above (like number)
        if (zodType instanceof z.ZodString && field.Type !== 'number') {
          zodType = zodType.min(1, { message: `${field.Label} is required` })
        }
      } else {
        zodType = zodType.optional()
      }

      // Apply pattern validation (only for strings)
      if (field.Validation?.pattern && zodType instanceof z.ZodString) {
        try {
          const regex = new RegExp(field.Validation.pattern)
          zodType = zodType.regex(regex, {
            // Use specific patternDescription if provided, otherwise use generic message
            message:
              field.Validation.patternDescription ??
              `Invalid format for ${field.Label}`,
          })
        } catch (error) {
          console.error(
            `Invalid regex pattern for field ${field.Label}: ${field.Validation.pattern}`,
            error
          )
          // Optionally add a refinement that always fails or handle differently
        }
      }

      // Use the generated field name as the key
      shape[fieldName] = zodType
    })

    return z.object(shape)
  }, [formFields])
  // --- End of Schema Generation ---

  // Dynamically generate default values
  const defaultValues = React.useMemo(() => {
    const values: FieldValues = {}
    formFields.forEach((field) => {
      const fieldName = generateFieldName(field.Label) // Generate safe name
      // Use the generated field name as the key
      values[fieldName] = field.Type === 'number' ? undefined : '' // Default empty string, undefined for number to avoid 0
    })
    return values
  }, [formFields])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  // Actual submit handler
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(`Form submitted for ${selectedCompany}:`, data)
    // TODO: Add logic to handle form submission (e.g., API call)
    // ✅ This will be type-safe and validated.
    form.reset() // Reset form after submission
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-4xl"
      >
        {formFields.map((fieldConfig) => (
          <FormField
            key={generateFieldName(fieldConfig.Label)}
            control={form.control}
            name={generateFieldName(fieldConfig.Label)}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldConfig.Label}
                  {fieldConfig.Validation?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </FormLabel>
                <FormControl>
                  {/* Render different input based on Type */}
                  {fieldConfig.Type === 'textarea' ? (
                    <Textarea
                      placeholder={`Enter ${fieldConfig.Label}`}
                      {...field}
                    />
                  ) : fieldConfig.Type === 'select' ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`Select ${fieldConfig.Label}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldConfig.Options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={fieldConfig.Type} // Handles 'text', 'email', 'number', 'date'
                      placeholder={`Enter ${fieldConfig.Label}`}
                      {...field}
                      // Ensure value is handled correctly for controlled number inputs
                      value={
                        field.value === undefined &&
                        fieldConfig.Type === 'number'
                          ? ''
                          : field.value ?? '' // Handle potential undefined/null
                      }
                    />
                  )}
                </FormControl>
                <FormMessage /> {/* Shows validation errors */}
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default DynamicForm
