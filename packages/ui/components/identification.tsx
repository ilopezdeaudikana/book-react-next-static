'use client'
import React, { useState } from 'react'
import { Modal, Input, Flex, Typography } from 'antd'

export const Identification = ({ submitUser, children }: { submitUser: (username: string) => Promise<{ id: string }>, children?: React.ReactNode}) => {
  const [open, setOpen] = useState(true)
  const [localUser, setLocalUser] = useState('')
  const [error, setError] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    setConfirmLoading(true)
    try {
      const { id } = await submitUser(localUser)
      if (id) {
        setOpen(false)
      } else {
        setError(`We could not submit ${localUser}`)
      }
    } catch (error) {
      console.log(error)
      setError('Unexpected error adding or getting the user')
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Modal
        title="Set your user"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ disabled:  !localUser }}
        mask={{ closable: false }}
      >
      <Flex vertical gap={8}>
        <label htmlFor="username">Your user name:</label>
        <Input id="username" onChange={(e) => setLocalUser(e.target.value)} />
        { children }
        {error && <Typography.Paragraph>{error}</Typography.Paragraph>}
      </Flex>
    </Modal >
    </>
  )
}
