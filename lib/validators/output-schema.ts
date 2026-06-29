// output-schema validator for FlowForge AI
export function validate_output_schema(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_output_schema(data) {
  return validate_output_schema(data).success
}
