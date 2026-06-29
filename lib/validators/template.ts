// template validator for FlowForge AI
export function validate_template(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_template(data) {
  return validate_template(data).success
}
