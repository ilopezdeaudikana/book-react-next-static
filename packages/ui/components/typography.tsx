'use client'
import { Typography as AntTypography } from 'antd'
import type { BaseType } from 'antd/es/typography/Base'
import type { ReactNode } from 'react'

export interface TypographyProps {
  href?: string
  target?: string
  variant: 'text' | 'link' | 'span'
  children: ReactNode
  type?: BaseType
}

const { Text, Link, Paragraph } = AntTypography

export const Typography = ({ href, target, variant, type, children }: TypographyProps) => {
  return(<>
    {variant === 'link' && <Link href={href} target={target}>{children}</Link>}
    {variant === 'text' && <Paragraph
      type={type}
    >
      {children}
    </Paragraph>}
    {variant === 'span' && <Text
      type={type}
    >
      {children}
    </Text>}
  </>)
}

