// search-query validator for FlowForge AI
export function validate_search_query(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_search_query(data) {
  return validate_search_query(data).success
}
