import React from 'react'
// FileUpload component for FlowForge AI
interface FileUploadProps {
  className?: string
  children?: React.ReactNode
}
export function FileUpload(props: FileUploadProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default FileUpload
