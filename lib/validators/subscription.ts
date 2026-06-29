// subscription validator for FlowForge AI
export function validate_subscription(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_subscription(data) {
  return validate_subscription(data).success
}
