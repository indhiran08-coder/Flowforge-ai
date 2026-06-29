// webhook validator for FlowForge AI
export function validate_webhook(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_webhook(data) {
  return validate_webhook(data).success
}
