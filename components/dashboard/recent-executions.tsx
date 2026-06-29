import React from 'react'
// RecentExecutions dashboard component
interface RecentExecutionsProps {
  className?: string
}
export function RecentExecutions(props: RecentExecutionsProps) {
  return React.createElement('div', { className: props.className }, 'RecentExecutions')
}
