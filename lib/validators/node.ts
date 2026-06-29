// node validator for FlowForge AI
export function validate_node(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_node(data) {
  return validate_node(data).success
}
