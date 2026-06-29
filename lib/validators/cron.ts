// cron validator for FlowForge AI
export function validate_cron(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_cron(data) {
  return validate_cron(data).success
}
