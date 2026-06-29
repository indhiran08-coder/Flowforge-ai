// url validator for FlowForge AI
export function validate_url(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_url(data) {
  return validate_url(data).success
}
