import React from 'react'
// PlanBadge dashboard component
interface PlanBadgeProps {
  className?: string
}
export function PlanBadge(props: PlanBadgeProps) {
  return React.createElement('div', { className: props.className }, 'PlanBadge')
}
