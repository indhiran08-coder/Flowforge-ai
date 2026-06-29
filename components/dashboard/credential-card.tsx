import React from 'react'
// CredentialCard dashboard component
interface CredentialCardProps {
  className?: string
}
export function CredentialCard(props: CredentialCardProps) {
  return React.createElement('div', { className: props.className }, 'CredentialCard')
}
