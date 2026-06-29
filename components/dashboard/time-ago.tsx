import React from 'react'
// TimeAgo dashboard component
interface TimeAgoProps {
  className?: string
}
export function TimeAgo(props: TimeAgoProps) {
  return React.createElement('div', { className: props.className }, 'TimeAgo')
}
