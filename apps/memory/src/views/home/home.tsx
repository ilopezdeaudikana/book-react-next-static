import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { User } from '../../types/models'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../store/slices/user-slice'
import { Identification } from '@repo/ui'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleSubmit = async (name: string): Promise<{ id: string }> => {
    return new Promise((resolve, _) => {
      setName(name)
      const user: User = { name, id: Math.random() }
      dispatch(setUser(user))
      resolve({ id: user.id.toString() })
    })
  }

  useEffect(() => {
    if(name) {
     navigate('/game')
    }
  }, [name])
  return (
    <>
      <Identification submitUser={handleSubmit} />
    </>
  )
}
