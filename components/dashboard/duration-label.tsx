import React from 'react'
// DurationLabel dashboard component
interface DurationLabelProps {
  className?: string
}
export function DurationLabel(props: DurationLabelProps) {
  return React.createElement('div', { className: props.className }, 'DurationLabel')
}
