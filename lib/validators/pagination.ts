// pagination validator for FlowForge AI
export function validate_pagination(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_pagination(data) {
  return validate_pagination(data).success
}
