export interface SelectOption { label: string; value: string; disabled?: boolean }
export interface FormField { name: string; label: string; type: 'text'|'textarea'|'select'|'number'|'code'; required?: boolean; options?: SelectOption[] }
