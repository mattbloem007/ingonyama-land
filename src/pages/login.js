import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { FirebaseContext, useAuth } from "../components/Firebase"
import { Form, Input, Button, ErrorMessage, GoogleButton } from "../components/common"
import Layout from "../components/layout"
import {
  Container,
  Section,
} from "../components/ui"

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  //const base = useContext(FirebaseContext)
  const { user, firebase, loading } = useAuth()
  //const { user } = useContext(FirebaseContext)
  const [errorMessage, setErrorMessage] = useState("")
  let isMounted = true
  console.log("login user", firebase)
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    firebase
      .login({ email: formValues.email, password: formValues.password })
      .then((res) => {
        console.log("window?", window)
        // if (typeof window !== "undefined") {
        //   window.sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken)
        // } else {
        //   sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken)
        // }
        // if (typeof window !== "undefined") {
        //   window.sessionStorage.setItem('user', JSON.stringify(res.user))
        // } else {
        //   sessionStorage.setItem('user', JSON.stringify(res.user))
        // }
        navigate("/account")
      })
      .catch(error => {
        if (isMounted) {
          setErrorMessage(error.message)
        }
      })
  }

  function handleGoogleSignIn(e) {
    e.preventDefault()

    firebase
      .signInWithGoogle()
      .then(() => {
        navigate("/")
      })
      .catch(error => {
        if (isMounted) {
          setErrorMessage(error.message)
        }
      })
  }

  function handleInputChange(e) {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Layout>
      <Section padding={4} background="muted">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Input
              required
              value={formValues.email}
              name="email"
              onChange={handleInputChange}
              placeholder="email"
              type="email"
            />
            <Input
              required
              value={formValues.password}
              name="password"
              onChange={handleInputChange}
              placeholder="password"
              type="password"
            />
            {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button type="submit" block>
              Login
            </Button>
            <GoogleButton onClick={handleGoogleSignIn}>
            Login with Google
          </GoogleButton>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
          </Form>
        </Container>
      </Section>
    </Layout>
  )
}

export default Login
