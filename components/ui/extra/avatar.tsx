import React from 'react'
// Avatar component for FlowForge AI
interface AvatarProps {
  className?: string
  children?: React.ReactNode
}
export function Avatar(props: AvatarProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Avatar
