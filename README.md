# Dynamic Forms Application (Celfocus FE Assignment)

This project is a solution for the Celfocus Frontend Developer technical challenge. It demonstrates the ability to build a React application that dynamically generates forms based on an external JSON configuration. The application allows users to select a company from a dropdown, which then renders a specific form tailored to that company as defined in the configuration.

## Core Functionality

1.  **Company Selection:** A dropdown (`CompanySelector`) allows the user to choose from a list of companies defined in the configuration.
2.  **Dynamic Form Rendering:** Upon selection, a `DynamicForm` component renders the appropriate form fields based on the configuration for the chosen company.
3.  **Configuration Driven:** The entire structure, field types, validation rules, and options for each company's form are driven by a JSON configuration file (`public/companhias.json`).
4.  **Extensibility:** Adding new companies or modifying existing forms primarily involves updating the JSON configuration file, requiring no code changes for existing field types.

## Technologies Used

*   **Framework/Library:** React 19 (with TypeScript)
*   **Build Tool:** Vite
*   **UI Components:** shadcn/ui (built on Radix UI & Tailwind CSS)
*   **Form Management:** React Hook Form
*   **Schema Validation & Type Safety:** Zod
*   **Data Fetching (for config):** TanStack Query (React Query)
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint

## Project Structure & Architecture

*   **`public/companhias.json`**: The core configuration file defining companies and their form fields. This simulates a backend configuration endpoint.
*   **`src\types.ts`**: Defines Zod schemas (`FormFieldTypeSchema`, `CompanyConfigSchema`) for validating the configuration data and inferring TypeScript types. This ensures type safety and acts as a single source of truth for the data structure.
*   **`src\hooks\useCompanyConfig.ts`**: (Assumed location) A custom hook likely using TanStack Query (`useQuery`) to fetch and cache the configuration data from `public/companhias.json`.
*   **`src\utils\formUtils.ts`**: Contains utility functions, specifically `generateFieldName` to create safe, programmatic field names from display labels.
*   **`src\components\companies\`**:
    *   **`Companies.tsx`**: The main orchestrating component. It uses `useCompanyConfig` to get data, manages the selected company state, and renders `CompanySelector` and `DynamicForm`. Handles loading and error states.
    *   **`CompanySelector.tsx`**: A reusable component displaying the company selection dropdown. Includes `aria-label` for accessibility.
    *
    *   **`DynamicForm.tsx`**: The core component responsible for:
        *   Receiving `formFields` configuration.
        *   Dynamically generating the Zod validation schema using `React.useMemo`.
        *   Dynamically generating default form values using `React.useMemo`.
        *   Integrating `react-hook-form` with the dynamic schema via `zodResolver`.
        *   Mapping field configurations to appropriate `shadcn/ui` input components (`Input`, `Textarea`, `Select`).
        *   Handling `required` and `pattern` validation logic.
        *   Using `generateFieldName` for robust internal field naming and `patternDescription` from config for clearer validation messages.
*   **`src\components\ui\`**: Contains the reusable UI components provided by `shadcn/ui`.

## Implemented Practices & Patterns

*   **Configuration Object Pattern:** The application's behavior is heavily driven by the external `companhias.json` configuration object. `DynamicForm` reads this configuration to adapt its structure and validation.
*   **SOLID Principles:**
    *   **Single Responsibility Principle (SRP):** Components and modules have focused roles (e.g., `types.ts` for schemas/types, `formUtils.ts` for utilities, `CompanySelector` for selection UI, `DynamicForm` for form logic/rendering).
    *   **Open/Closed Principle (OCP):** The system is open for extension by adding new company configurations to the JSON file without modifying the core form rendering code (for existing field types). It is closed for modification in that sense. Modification is required only if *new field types* need to be supported.
*   **Separation of Concerns:** Logic is separated into hooks (`useCompanyConfig`), utility functions (`formUtils.ts`), type definitions (`types.ts`), and distinct UI components.
*   **Component Composition:** React's composition model is used throughout (e.g., `Companies` composes `CompanySelector` and `DynamicForm`).
*   **Type Safety:** Leverages TypeScript and Zod for strong type checking at compile time and runtime validation of configuration and form data.
*   **Accessibility:** Basic accessibility is considered (e.g., `aria-label` on `CompanySelector`, automatic `htmlFor`/`id` linking handled by `shadcn/ui` Form components).
*   **Performance Optimization:** `React.useMemo` is used in `DynamicForm` to avoid unnecessary recalculations of the form schema and default values.
*   **Code Clarity & Documentation:** JSDoc comments are added to key components like `DynamicForm` to explain their purpose and features. Type definitions in `types.ts` include explanatory comments.

## Setup and Running the Application

**Prerequisites:**

*   Node.js (LTS version recommended)
*   A package manager: `pnpm` (recommended), `npm`, or `yarn`

**Installation:**

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  Install dependencies:
    ```bash
    # Using pnpm
    pnpm install

    # Or using npm
    npm install

    # Or using yarn
    yarn install
    ```

**Running the Development Server:**

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

This will start the Vite development server, typically available at `http://localhost:5173`.

**Configuration File:**

The application expects the form configuration to be present in `public/companhias.json`. Ensure this file exists and is structured according to the schema defined in `src\types.ts`.
