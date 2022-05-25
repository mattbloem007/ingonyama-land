import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "@reach/router"
import { FirebaseContext, useAuth } from "../components/Firebase"
import { Form, Input, Button, ErrorMessage, GoogleButton } from "../components/common"
import Layout from "../components/layout"
import {
  Container,
  Section,
  Flex
} from "../components/ui"
import "../components/common/form.css"

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const { user, firebase, loading } = useAuth()
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
    console.log("form values", formValues)
    firebase
      .login({ email: formValues.email, password: formValues.password })
      .then((res) => {
        console.log("window?", window)
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken)
        }
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem('user', JSON.stringify(res.user))
        }
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
        <div class="container">
     <div class="row">
   <div class="col-md-5 mx-auto">
   <div id="first">
     <div class="myform form ">
        <div class="logo mb-3">
          <div class="col-md-12 text-center">
           <h1>Login</h1>
          </div>
       </div>
                <Form onSubmit={handleSubmit}>
                        <div class="form-group">
                           <label for="exampleInputEmail1">Email address</label>
                           <input
                           value={formValues.email}
                           onChange={handleInputChange}
                           type="email"
                           name="email"
                           class="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                           <label for="exampleInputEmail1">Password</label>
                           <input
                           value={formValues.password}
                           onChange={handleInputChange}
                           type="password"
                           name="password"
                           id="password"
                           class="form-control"
                           aria-describedby="emailHelp"
                           placeholder="Enter Password" />
                        </div>
                        <div class="form-group">
                           <p class="text-center">By signing up you accept our Terms Of Use</p>
                        </div>
                        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <div class="col-md-12 text-center ">
                           <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                        </div>
                        <div class="col-md-12 ">
                           <div class="login-or">
                              <hr class="hr-or" />
                              <span class="span-or">or</span>
                           </div>
                        </div>
                        <div class="col-md-12 mb-3">
                           <p class="text-center">
                              <button onClick={handleGoogleSignIn} class="google btn mybtn"><i class="fa fa-google-plus">
                              </i> Signup using Google
                              </button>
                           </p>
                        </div>
                        <div class="form-group">
                           <p class="text-center">Don't have account? <a href="/register" id="signup">Sign up here</a></p>
                        </div>
                        <div class="form-group">
                          <p class="text-center"><Link to="/reset">Forgot Password</Link></p>
                        </div>
                     </Form>

     </div>
   </div>

              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default Login
