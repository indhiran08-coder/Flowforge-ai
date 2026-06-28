export const REGEX = {
  EMAIL:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL:/^https?:\/\/[-\w@:%.+~#=]{1,256}\.[a-z]{2,6}\b/i,
  UUID:/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  SLUG:/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const
