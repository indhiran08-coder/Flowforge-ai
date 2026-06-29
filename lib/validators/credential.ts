// credential validator for FlowForge AI
export function validate_credential(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_credential(data) {
  return validate_credential(data).success
}
