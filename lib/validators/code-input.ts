// code-input validator for FlowForge AI
export function validate_code_input(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_code_input(data) {
  return validate_code_input(data).success
}
