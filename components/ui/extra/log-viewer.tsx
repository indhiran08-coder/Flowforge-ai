import React from 'react'
// LogViewer component for FlowForge AI
interface LogViewerProps {
  className?: string
  children?: React.ReactNode
}
export function LogViewer(props: LogViewerProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default LogViewer
