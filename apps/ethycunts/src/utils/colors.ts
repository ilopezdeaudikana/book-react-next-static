export const GROUP_COLORS: Record<string, string> = {
  analytics: '#3b82f6',
  integration: '#f59e0b',
  application: '#10b981',
  database: '#8b5cf6',
  'advertising.first_party': '#06b6d4',
  'advertising.third_party': '#ef4444',
  'improve.system': '#3b82f6',
  'provide.system': '#f59e0b',
  'provide.system.operations.support': '#8b5cf6'
}

export const DEFAULT_COLOR = '#64748b'

export const colorForGroup = (group: string): string => {
  return GROUP_COLORS[group.toLowerCase()] ?? DEFAULT_COLOR
}