import { Flex as AntFlex } from 'antd'
import type { ReactNode } from 'react'

export interface FlexProps {
  vertical?: boolean, children: ReactNode, justify?: string, wrap?: boolean, gap?: string,
  style?: React.CSSProperties
}

export const Flex = ({ vertical, children, justify, wrap, gap, style }: FlexProps) => {
  return <AntFlex 
    justify={justify} 
    gap={gap} 
    wrap={wrap} 
    vertical={vertical} 
    style={style}
  >
    {children}
  </AntFlex>
}