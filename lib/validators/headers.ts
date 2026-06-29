// headers validator for FlowForge AI
export function validate_headers(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_headers(data) {
  return validate_headers(data).success
}
