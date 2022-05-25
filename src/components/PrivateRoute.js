import React from "react"
//import { navigate } from "gatsby"
import { navigate } from "@reach/router"
import { useAuth} from "./Firebase"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { firebase } = useAuth()
   let user = null;
   console.log("IN PrivateRoute")
    if (typeof window !== "undefined") {
      user = JSON.parse(window.sessionStorage.getItem('user'))
    }
  if (!user && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
