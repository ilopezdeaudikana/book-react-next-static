'use client'
import { Skeleton } from 'antd'

export const TableSkeleton = () => {
  
  const rows = 12

  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <Skeleton.Input active size="large" style={{ width: 200 }} />
        <Skeleton.Button active size="large" style={{ width: 100 }} />
      </div>

      <div style={{ border: '1px solid #f0f0f0', borderRadius: '8px' }}>
        {/* Fake Header Row */}
        <div style={{ display: 'flex', padding: '16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ flex: 1 }}>
              <Skeleton.Input active size="small" style={{ width: '60%' }} />
            </div>
          ))}
        </div>

        {/* Fake Data Rows */}
        {[...Array(rows)].map((_, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              padding: '16px',
              borderBottom: index === rows - 1 ? 'none' : '1px solid #f0f0f0'
            }}
          >
            <div style={{ flex: 1 }}><Skeleton.Input active size="small" style={{ width: '80%' }} /></div>
            <div style={{ flex: 1 }}><Skeleton.Input active size="small" style={{ width: '70%' }} /></div>
            <div style={{ flex: 1 }}><Skeleton.Input active size="small" style={{ width: '40%' }} /></div>
            <div style={{ flex: 1 }}><Skeleton.Button active size="small" style={{ width: 60 }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

