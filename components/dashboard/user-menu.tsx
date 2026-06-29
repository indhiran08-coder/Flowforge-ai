import React from 'react'
// UserMenu dashboard component
interface UserMenuProps {
  className?: string
}
export function UserMenu(props: UserMenuProps) {
  return React.createElement('div', { className: props.className }, 'UserMenu')
}
