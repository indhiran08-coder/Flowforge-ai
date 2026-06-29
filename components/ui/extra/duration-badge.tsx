import React from 'react'
// DurationBadge component for FlowForge AI
interface DurationBadgeProps {
  className?: string
  children?: React.ReactNode
}
export function DurationBadge(props: DurationBadgeProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default DurationBadge
