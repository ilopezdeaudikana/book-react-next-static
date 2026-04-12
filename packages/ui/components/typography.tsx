'use client'
import { Typography as AntTypography } from 'antd'
import type { BaseType } from 'antd/es/typography/Base'
import type { ReactNode } from 'react'

export interface TypographyProps {
  href?: string
  target?: string
  variant: 'text' | 'link'
  children: ReactNode
  type?: BaseType
}

const { Text, Link } = AntTypography

export const Typography = ({ href, target, variant, type, children }: TypographyProps) => {
  return(<>
    {variant === 'link' && <Link href={href} target={target}>{children}</Link>}
    {variant === 'text' && <Text
      type={type}
    >
      {children}
    </Text>}
  </>)
}

