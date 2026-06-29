// edge validator for FlowForge AI
export function validate_edge(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_edge(data) {
  return validate_edge(data).success
}
