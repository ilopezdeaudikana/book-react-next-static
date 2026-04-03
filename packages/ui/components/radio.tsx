import { Radio as AntRadio, type CheckboxOptionType, type RadioChangeEvent } from 'antd'

export interface RadioProps {
  testId?: string,
  value: any
  disabled?: boolean,
  onChange: (e: RadioChangeEvent) => void | undefined
  options: (string | number | CheckboxOptionType<any>)[]
}
export const Radio = (
  { testId, onChange, value, disabled, options }: RadioProps
) => {
  return <AntRadio.Group
    data-testid={testId}
    block
    onChange={onChange}
    options={options}
    defaultValue={value}
    optionType="button"
    disabled={disabled}
  />

}