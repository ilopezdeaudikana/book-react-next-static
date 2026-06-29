import {
  Radio as AntRadio,
  type CheckboxOptionType,
  type RadioChangeEvent,
} from 'antd'

export interface RadioProps {
  testId?: string
  value: string | number
  disabled?: boolean
  onChange: (e: RadioChangeEvent) => void | undefined
  options: (string | number | CheckboxOptionType<string | number>)[]
}
export const Radio = ({
  testId,
  onChange,
  value,
  disabled,
  options,
}: RadioProps) => {
  return (
    <AntRadio.Group
      data-testid={testId}
      block
      onChange={onChange}
      options={options}
      defaultValue={value}
      optionType="button"
      disabled={disabled}
    />
  )
}
