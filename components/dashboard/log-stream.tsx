import React from 'react'
// LogStream dashboard component
interface LogStreamProps {
  className?: string
}
export function LogStream(props: LogStreamProps) {
  return React.createElement('div', { className: props.className }, 'LogStream')
}
