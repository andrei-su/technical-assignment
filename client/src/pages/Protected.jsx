import { Navigate, Outlet } from "react-router-dom"

const Protected = ({ isUser}) => {
  if (!isUser) {
    return <Navigate to='/' replace/>
  }

  return <Outlet />
}

export default Protected;