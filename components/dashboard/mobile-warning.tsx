import React from 'react'
// MobileWarning dashboard component
interface MobileWarningProps {
  className?: string
}
export function MobileWarning(props: MobileWarningProps) {
  return React.createElement('div', { className: props.className }, 'MobileWarning')
}
