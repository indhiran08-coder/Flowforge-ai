// email validator for FlowForge AI
export function validate_email(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_email(data) {
  return validate_email(data).success
}
