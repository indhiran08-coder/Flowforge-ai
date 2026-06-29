// query-params validator for FlowForge AI
export function validate_query_params(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_query_params(data) {
  return validate_query_params(data).success
}
