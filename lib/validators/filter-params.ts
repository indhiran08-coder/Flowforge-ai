// filter-params validator for FlowForge AI
export function validate_filter_params(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_filter_params(data) {
  return validate_filter_params(data).success
}
