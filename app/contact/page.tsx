'use client'
import { useState } from 'react'
import { Button, Form, Input, Card, Space, Flex } from 'antd'
import { url } from '../url'

const ContactPage = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = async ({ email, message }) => {
    const response = await fetch(`${url}/api/contact`, {
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
    <Flex gap="middle" vertical>
      <Flex justify="center">
        <Space vertical size={16}>
          <Card title="Contact me" style={{ width: '100%' }}>
            <div className='contact'>
              <div className='content'>
                <Form 
                  onFinish={handleSubmit}
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                >
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
                  <Form.Item
                    label='Message'
                    name='message'
                    rules={[{ required: true, message: 'This field is mandatory' }]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit' style={{ backgroundColor: '#428bca' }}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                {status && <p>{status}</p>}
              </div>
            </div>
          </Card>
        </Space>
      </Flex>
    </Flex>
  )
}

      export default ContactPage
