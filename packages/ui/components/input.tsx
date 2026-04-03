import type { ComponentProps, ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import { Input as AntInput } from 'antd'

export interface InputProps extends Omit<ComponentProps<typeof AntInput>, 'type'> {
  type?: 'search'
  placeholder?: string
  onSearch?: (value: string, event?: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>) => void
}

const InputRoot = ({ onSearch, type, ...props }: InputProps) => {
  return (type && type === 'search') ? 
    <AntInput.Search 
      enterButton
      onSearch={onSearch}
      {...props}
    />: 
    <AntInput  
      {...props}
    />
}

export const Input = Object.assign(InputRoot, {
  TextArea: AntInput.TextArea
})
