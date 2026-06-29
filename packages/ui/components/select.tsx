import { Select as AntSelect } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'

export interface SelectProps {
  testId?: string, 
  value: number | string | string []
  disabled?: boolean, 
  onChange: ((value: number | string | string [], option?: DefaultOptionType | DefaultOptionType[] | undefined) => void) | undefined
  options: DefaultOptionType[],
  className?: string
}
export const Select = (
  { testId, onChange, value, disabled, options, className }: SelectProps
) => {
  return <AntSelect
    data-testid={testId}
    mode="multiple"
    allowClear
    className={className}
    value={value}
    disabled={disabled}
    onChange={onChange}
    options={options}
  />

}