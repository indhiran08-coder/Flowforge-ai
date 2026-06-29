import React from 'react'
// CommandPalette component for FlowForge AI
interface CommandPaletteProps {
  className?: string
  children?: React.ReactNode
}
export function CommandPalette(props: CommandPaletteProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default CommandPalette
