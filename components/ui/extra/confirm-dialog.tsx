import React from 'react'
// ConfirmDialog component for FlowForge AI
interface ConfirmDialogProps {
  className?: string
  children?: React.ReactNode
}
export function ConfirmDialog(props: ConfirmDialogProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default ConfirmDialog
