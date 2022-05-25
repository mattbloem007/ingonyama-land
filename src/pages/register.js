import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "@reach/router"
import { FirebaseContext, useAuth } from "../components/Firebase"
import { Form, Input, Button, ErrorMessage, GoogleButton, Select } from "../components/common"
import Layout from "../components/layout"
import {
  Container,
  Section,
  Flex
} from "../components/ui"
import "../components/common/form.css"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth"
import {
  collection,
  addDoc,
} from "firebase/firestore"

const Register = () => {
  const { firebase } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
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

 async function handleSubmit(e) {
    e.preventDefault()
    console.log(formValues)

    if (formValues.password === formValues.confirmPassword) {
      createUserWithEmailAndPassword(firebase.auth, formValues.email, formValues.password)
        .then(async (user) => {

            if (typeof window !== "undefined") {
              window.sessionStorage.setItem('Auth Token', user._tokenResponse.refreshToken)
            }
            await addDoc(collection(firebase.db, "users"), {
            uid: user.user.uid,
            name: formValues.username,
            authProvider: "local",
            email: formValues.email,
            number: formValues.number,
            role: formValues.role
          });
            console.log('User', user, 'registered!');
            sendEmailVerification(user.user, {
               url: "http://localhost:8000/verify",
             })
            .then((c) => {
              console.log("done", c)
            })
            return user
        })
        .then(() => {
          navigate("/verify")
        })
        .catch((error) => {
          setErrorMessage(error.message)
          navigate("/register")
        });
        // await firebase
        //   .register({
        //     firstname: formValues.firstname,
        //     lastname: formValues.lastname,
        //     username: formValues.username,
        //     role: formValues.role,
        //     number: formValues.number,
        //     email: formValues.email,
        //     password: formValues.password,
        //   })
        //   .then((res) => {
        //     console.log("RES", res)
        // //    navigate("/account")
        //   })
        // .catch(error => {
        //   console.log("HEre")
        //   if (isMounted) {
        //     setErrorMessage(error.message)
        //   }
        // })
    } else {
      setErrorMessage("Password and Confirm Password fields must match")
    }
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
           <h1>Sign Up</h1>
          </div>
            </div>
                <form onSubmit={handleSubmit}>
                <div class="form-group">
                        <label>First Name</label>
                        <input
                        onChange={handleInputChange}
                        value={formValues.firstname}
                        type="text"
                        name="firstname"
                        class="form-control"
                        id="firstname"
                        aria-describedby="emailHelp"
                        placeholder="Enter Firstname"
                        />
                     </div>
                     <div class="form-group">
                        <label>Last Name</label>
                        <input
                        onChange={handleInputChange}
                        value={formValues.lastname}
                        type="text"
                        name="lastname"
                        class="form-control"
                        id="lastname"
                        aria-describedby="emailHelp"
                        placeholder="Enter Lastname"
                        />
                     </div>
                     <div class="form-group">
                        <label>Username</label>
                        <input
                        onChange={handleInputChange}
                        value={formValues.username}
                        type="text"
                        name="username"
                        class="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                        />
                     </div>
                     <div class="form-group">
                        <label>Number</label>
                        <input
                        onChange={handleInputChange}
                        value={formValues.number}
                        type="text"
                        name="number"
                        class="form-control"
                        id="number"
                        aria-describedby="emailHelp"
                        placeholder="Enter cell number"
                        />
                     </div>
                     <div class="form-group">
                     <label>User Role</label>
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
                     </div>
                     <div class="form-group">
                        <label>Email address</label>
                        <input
                        onChange={handleInputChange}
                        value={formValues.email}
                        type="email"
                        name="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email" />
                     </div>
                     <div class="form-group">
                        <label>Password</label>
                        <input
                        onChange={handleInputChange}
                        value={formValues.password}
                        minLength={6}
                        type="password"
                        name="password"
                        id="password"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter Password" />
                     </div>
                     <div class="form-group">
                        <label>Confirm Password</label>
                        <input
                        onChange={handleInputChange}
                        defaultValue={formValues.confirmPassword}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        class="form-control"
                        placeholder="Confirm Password" />
                     </div>
                     {!!errorMessage && <div class="form-group">
                                          <ErrorMessage style={{textAlign: "center"}}>{errorMessage}</ErrorMessage>
                                        </div>
                    }
                     <div class="col-md-12 text-center mb-3">
                        <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">Get Started</button>
                     </div>
                     <div class="col-md-12 mb-3">
                        <p class="text-center">
                           <button onClick={handleGoogleSignIn} class="google btn mybtn"><i class="fa fa-google-plus">
                           </i> Signup using Google
                           </button>
                        </p>
                     </div>
                     <div class="col-md-12 ">
                        <div class="form-group">
                           <p class="text-center"><a href="/login" id="signin">Already have an account?</a></p>
                        </div>
                     </div>
                     </form>

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

export default Register
