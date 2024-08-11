import { Navigate, Outlet } from "react-router-dom"
import { useGlobalContext } from "../hooks/useGlobalContext";

const Protected = () => {
  const state = useGlobalContext();

  if (state?.user?.name === '') {
    return <Navigate to='/' replace/>
  }

  return <Outlet />
}

export default Protected;