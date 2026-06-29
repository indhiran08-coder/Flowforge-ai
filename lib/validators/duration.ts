// duration validator for FlowForge AI
export function validate_duration(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_duration(data) {
  return validate_duration(data).success
}
