'use client'
import { Input } from '@repo/ui'
import React, { ComponentProps } from 'react'

interface SearchInputProps extends ComponentProps<typeof Input> {
  style?: React.CSSProperties
  value: string
}
export const SearchInput = ({ style, value, ...props }: SearchInputProps) => {
  return (
    <>
      <Input
        type='search'
        placeholder='input search text'
        style={style}
        value={value}
        {...props}
      />
    </>
  )
}