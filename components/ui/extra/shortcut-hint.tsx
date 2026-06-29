import React from 'react'
// ShortcutHint component for FlowForge AI
interface ShortcutHintProps {
  className?: string
  children?: React.ReactNode
}
export function ShortcutHint(props: ShortcutHintProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default ShortcutHint
