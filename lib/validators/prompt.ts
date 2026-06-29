// prompt validator for FlowForge AI
export function validate_prompt(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_prompt(data) {
  return validate_prompt(data).success
}
