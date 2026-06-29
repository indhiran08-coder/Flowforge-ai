import React from 'react'
// Divider component for FlowForge AI
interface DividerProps {
  className?: string
  children?: React.ReactNode
}
export function Divider(props: DividerProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Divider
