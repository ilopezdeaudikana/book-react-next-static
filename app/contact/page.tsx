'use client'
import { useState } from 'react'
import { Button, Form, Input } from 'antd'

const ContactPage = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = async ({ email, message }) => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, message })
    })

    const data = await response.json()

    if (data.success) {
      setStatus('Email sent successfully!')
    } else {
      setStatus('Failed to send email. Please try again.')
    }
  }

  return (
    <div className='contact'>
      <div className='content'>
        <Form onFinish={handleSubmit}>
          <div>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'This field is mandatory'
                }
              ]}
            >
              <Input placeholder="acme@whatever.com" />
            </Form.Item>
          </div>
          <div className='row'>
            <Form.Item
              label='Message'
              name='message'
              rules={[{ required: true, message: 'This field is mandatory' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' style={{ backgroundColor: '#428bca' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        {status && <p>{status}</p>}
      </div>
    </div>
  )
}

export default ContactPage
