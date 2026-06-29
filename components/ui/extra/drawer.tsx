import React from 'react'
// Drawer component for FlowForge AI
interface DrawerProps {
  className?: string
  children?: React.ReactNode
}
export function Drawer(props: DrawerProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Drawer
