import React from 'react'
// NodeBadge component for FlowForge AI
interface NodeBadgeProps {
  className?: string
  children?: React.ReactNode
}
export function NodeBadge(props: NodeBadgeProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default NodeBadge
