import React from 'react'
// NodePalette dashboard component
interface NodePaletteProps {
  className?: string
}
export function NodePalette(props: NodePaletteProps) {
  return React.createElement('div', { className: props.className }, 'NodePalette')
}
