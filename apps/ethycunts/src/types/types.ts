import { z } from 'zod'

const PrivacyDeclaration = z.object({
  data_categories: z.array(z.string()),
  data_subjects: z.array(z.string()),
  data_use: z.string(),
  name: z.string()
})

export const PrivacyDeclarationSchema = PrivacyDeclaration.transform((keys) => {
  const { name, data_categories, data_subjects, data_use } = keys
  return {
    name,
    dataCategories: data_categories,
    dataSubjects: data_subjects,
    dataUse: data_use
  }
})

export type PrivacyDeclaration = z.infer<typeof PrivacyDeclarationSchema>

const SystemDefinition = z.object({
  description: z.string(),
  fides_key: z.string(),
  name: z.string(),
  privacy_declarations: z.array(PrivacyDeclarationSchema),
  system_dependencies: z.array(z.string()),
  system_type: z.string()
})

export const SystemDefinitionSchema = SystemDefinition.transform((keys) => {
  const { name, description, fides_key, privacy_declarations, system_dependencies, system_type } = keys
  return {
    name,
    description,
    fidesKey: fides_key,
    privacyDeclarations: privacy_declarations,
    systemDependencies: system_dependencies,
    systemType: system_type
  }
})

export type SystemDefinition = z.infer<typeof SystemDefinitionSchema>

export type SystemWithMeta = SystemDefinition & {
  categories: string[]
  uses: string[]
}

export const ApiResponseSchema = z.array(SystemDefinitionSchema)

export const LayoutMode = {
  SystemType: 'system_type',
  DataUse: 'data_use',
} as const

export type LayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode]

export const DataStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Error: 'error',
  Ready: 'ready',
} as const

export type DataStatus = (typeof DataStatus)[keyof typeof DataStatus]

