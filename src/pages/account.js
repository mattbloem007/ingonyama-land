import React from 'react'
import { useState } from 'react'
import { navigate, Router } from '@reach/router'
import { Link } from 'gatsby'
import Layout from "../components/layout"
import { useAuth } from "../components/Firebase"
import {
  Container,
  Section,
  Button,
  Flex
} from "../components/ui"
import { Form, Label, Input } from "reactstrap"


const Account = () => {
  const [profile, setProfile] = React.useState(null)
  const [formValues, setFormValues] = useState({ name: "", number: "", role: "" })
  const {user,  firebase } = useAuth()

  //const { firebase } = useContext(FirebaseContext)
  // let user = null;
  React.useEffect(() => {

    // if (typeof window !== "undefined") {
    //   user = JSON.parse(window.sessionStorage.getItem('user'))
    // } else {
    //   user = JSON.parse(sessionStorage.getItem('user'))
    // }
    // if (user) {
    //   if (profile == null) {
    //     console.log("her in")
    //     try {
    //         firebase.getUserProfile({userId: user.uid})
    //         .then((profile) => {
    //           setProfile(profile)
    //           //console.log(profile)
    //         })
    //       }
    //       catch(err) {
    //         console.log(err)
    //       }
    //   }
    // }
  })

  function handleEdit(e) {
    e.preventDefault()
    if (typeof document !== "undefined") {
      document.getElementById('phone').disabled = false;
      document.getElementById('name').disabled = false;
      document.getElementById('role').disabled = false;
      document.getElementById('edit').hidden = true;
      document.getElementById('save').hidden = false;
  }
  }

  function handleSave(e) {
    e.preventDefault()
    if (typeof document !== "undefined") {
      document.getElementById('phone').disabled = true;
      document.getElementById('name').disabled = true;
      document.getElementById('role').disabled = true;
      document.getElementById('edit').hidden = false;
      document.getElementById('save').hidden = true;
    }

    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

    return (
      <Layout>
        <Section padding={4} background="muted">
          <Container>
          <div class="row container d-flex justify-content-center" style={{marginLeft: "0px", marginRight: "0px"}}>
            <div class="col-xl-12 col-md-12">
              <div class="card user-card-full">
                  <div class="row m-l-0 m-r-0">
                      <div class="col-sm-4 bg-c-lite-green user-profile">
                        <div class="card-block text-center text-white">
                          <div class="m-b-25">
                            <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                          </div>
                          <Form>
                            <Flex style={{flexDirection: "column"}}>
                              <Input class="f-w-600" id="name" style={{color: "grey", width: "30%", textAlign: "center"}} defaultValue={profile && formValues.name=="" ? profile.name : formValues.name} disabled></Input>
                              <Input id="role" style={{color: "grey", width: "30%", textAlign: "center"}} disabled defaultValue={profile && formValues.role=="" ? profile.role : formValues.role}></Input>
                              <Button id="edit" hidden={false} onClick={handleEdit} style={{padding: "4px", paddingRight: "16px", paddingLeft: "16px"}}>Edit</Button>
                              <Button id="save" hidden={true} onClick={handleSave} style={{padding: "4px", paddingRight: "16px", paddingLeft: "16px"}}>Save</Button>
                            </Flex>
                          </Form>
                        </div>
                    </div>
                    <div class="col-sm-8">
                    <Form>
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                          <div class="row">
                            <div class="col-sm-6">
                                <p class="m-b-10 f-w-600">Email</p>
                                <Input class="text-muted f-w-200" style={{width: "50%"}} id="emailInfo" defaultValue={profile ? profile.email : ""} disabled></Input>                            </div>
                            <div class="col-sm-6">
                                <p class="m-b-10 f-w-600">Phone</p>
                                <Input class="text-muted f-w-200" style={{width: "50%"}} id="phone" defaultValue={profile && formValues.number=="" ? profile.number : formValues.number} disabled></Input>
                            </div>
                          </div>
                          <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Land Leased</h6>
                            <div class="row">
                              <div class="col-sm-6">
                                  <p class="m-b-10 f-w-600">Owned</p>
                                  <h6 class="text-muted f-w-400">Land Plot #55</h6>
                              </div>
                              <div class="col-sm-6">
                                  <p class="m-b-10 f-w-600">Awaiting Confirmation</p>
                                  <h6 class="text-muted f-w-400">Land Plot #12</h6>
                              </div>
                            </div>
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

export default Account
