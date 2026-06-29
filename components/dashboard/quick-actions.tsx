import React from 'react'
// QuickActions dashboard component
interface QuickActionsProps {
  className?: string
}
export function QuickActions(props: QuickActionsProps) {
  return React.createElement('div', { className: props.className }, 'QuickActions')
}
