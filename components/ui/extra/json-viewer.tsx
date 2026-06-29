import React from 'react'
// JsonViewer component for FlowForge AI
interface JsonViewerProps {
  className?: string
  children?: React.ReactNode
}
export function JsonViewer(props: JsonViewerProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default JsonViewer
