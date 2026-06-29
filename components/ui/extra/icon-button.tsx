import React from 'react'
// IconButton component for FlowForge AI
interface IconButtonProps {
  className?: string
  children?: React.ReactNode
}
export function IconButton(props: IconButtonProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default IconButton
