// date-range validator for FlowForge AI
export function validate_date_range(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_date_range(data) {
  return validate_date_range(data).success
}
