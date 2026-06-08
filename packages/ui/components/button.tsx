import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd'
import type { ReactNode } from 'react'

export interface ButtonProps {
  testId?: string, type?: 'submit' | 'reset', 
  children: ReactNode, 
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}
export const Button = (
  { testId, children, onClick, type, ...restProps }: ButtonProps & AntButtonProps
) => {
  return <AntButton
    type='primary' 
    htmlType={type ?? 'button'} 
    style={{ backgroundColor: '#428bca' }}
    data-testid={testId}
    variant="outlined"
    size="small"
    onClick={onClick}
    {...restProps}
  >
    {children}
  </AntButton>
}