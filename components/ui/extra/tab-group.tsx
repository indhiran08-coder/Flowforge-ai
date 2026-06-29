import React from 'react'
// TabGroup component for FlowForge AI
interface TabGroupProps {
  className?: string
  children?: React.ReactNode
}
export function TabGroup(props: TabGroupProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default TabGroup
