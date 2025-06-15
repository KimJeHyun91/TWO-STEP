import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'

const Admin = () => {
  const loginId = localStorage.getItem("loginUserId")
  const isAdmin = loginId === 'admin'
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      alert("접근 권한이 없습니다.")
      setRedirect(true)
    }
  }, [isAdmin])

  if (redirect) return <Navigate to="/" replace />
  if (!isAdmin) return null  // alert 후 Navigate 전까지 빈 화면

  return <Dashboard />
}

export default Admin
