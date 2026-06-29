import React from 'react'
// RunButton dashboard component
interface RunButtonProps {
  className?: string
}
export function RunButton(props: RunButtonProps) {
  return React.createElement('div', { className: props.className }, 'RunButton')
}
