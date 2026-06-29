// sort-order validator for FlowForge AI
export function validate_sort_order(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_sort_order(data) {
  return validate_sort_order(data).success
}
