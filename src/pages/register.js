import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { Form, Input, Button, ErrorMessage, GoogleButton, Select } from "../components/common"
import { useAuth } from "../components/Firebase"
import Layout from "../components/layout"
import {
  Container,
  Section,
} from "../components/ui"

const Register = () => {
//  const { firebase } = useContext(FirebaseContext)
  const { firebase } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")

  const [formValues, setFormValues] = useState({
    email: "",
    role: "",
    number: "",
    password: "",
    confirmPassword: "",
    username: "",
  })

  let isMounted = true

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false
    }
  }, [])

  function handleInputChange(e) {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    })
  )

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

  function handleSubmit(e) {
    e.preventDefault()

    console.log("Data:", formValues)

    if (formValues.password === formValues.confirmPassword) {
      firebase
        .register({
          username: formValues.username,
          role: formValues.role,
          number: formValues.number,
          email: formValues.email,
          password: formValues.password,
        })
        .then(() => {
          navigate("/account")
        })
        .catch(error => {
          if (isMounted) {
            setErrorMessage(error.message)
          }
        })
    } else {
      setErrorMessage("Password and Confirm Password fields must match")
    }
  }

  return (
    <Layout>
      <Section padding={4} background="muted">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Input
              onChange={handleInputChange}
              value={formValues.username}
              placeholder="username"
              type="text"
              required
              name="username"
            />
            <Input
              onChange={handleInputChange}
              value={formValues.email}
              placeholder="email"
              type="email"
              required
              name="email"
            />
            <Input
              onChange={handleInputChange}
              value={formValues.number}
              placeholder="phone number"
              type="text"
              required
              name="number"
            />
            <Select
              onChange={handleInputChange}
              value={formValues.role}
              placeholder="role"
              required
              name="role"
            >
              <option>----ROLE-----</option>
              <option>Lessee</option>
              <option>IT Admin</option>
              <option>Area Officer</option>
              <option>Surveyor</option>
              <option>IT Board</option>
              <option>IT Legal</option>
              <option>IT Finance</option>
            </Select>
            <Input
              onChange={handleInputChange}
              value={formValues.password}
              placeholder="password"
              type="password"
              required
              minLength={6}
              name="password"
            />
            <Input
              onChange={handleInputChange}
              value={formValues.confirmPassword}
              placeholder="confirm password"
              type="password"
              required
              minLength={6}
              name="confirmPassword"
            />
            {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button type="submit" block>
              Register
            </Button>
            <GoogleButton onClick={handleGoogleSignIn}>
            Register with Google
          </GoogleButton>
          </Form>
        </Container>
      </Section>
    </Layout>
  )
}

export default Register
