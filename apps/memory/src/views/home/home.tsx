import { useState, useEffect } from 'react'
import type { User } from '../../types/models'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../store/user.store'
import { Button, Identification } from '@repo/ui'

export const Home = () => {
  const navigate = useNavigate()
  const setUser = useUser(state => state.setUser)
  const [name, setName] = useState('')
  const [open, setOpen] = useState<boolean | undefined>()

  const handleSubmit = async (name: string): Promise<{ id: string }> => {
    return new Promise((resolve) => {
      setName(name)
      const user: User = { name, id: Math.random() }
      setUser(user)
      resolve({ id: user.id.toString() })
    })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (name) {
      navigate('/game')
    }
  }, [name, navigate])
  return (
    <div className='container'>
      <Button className='btn' onClick={handleOpen}>Set your user</Button>
      <Identification open={open} closable={true} submitUser={handleSubmit} onCancel={() => setOpen(false)}/>
    </div>
  )
}
