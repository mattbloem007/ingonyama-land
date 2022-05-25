import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router"
import { useAuth } from "../components/Firebase"
import { ResetDiv, ResetContainer, ResetTextBox, ResetBtn } from "../components/common"
import Layout from "../components/layout"
import {
  Container,
  Section,
  Flex,
  Button
} from "../components/ui"
import "../components/common/form.css"

const Verify = () => {
//  const { firebase } = useContext(FirebaseContext)
  const { firebase } = useAuth()
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  let isMounted = true

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false
    }
  }, [])

  return (
    <Layout>
    <Section padding={4} background="muted">
      <Container>
        <Flex style={{flexDirection: "column"}}>
        <div class="logo mb-3">
          <div class="col-md-12 text-center">
          <h1>
           We sent you a verification email. Please check your email and verify before logging in.
          </h1>
          </div>
            </div>

          <Button
            onClick={() => navigate("/login")}
          >
            Done
          </Button>
        </Flex>
      </Container>
     </Section>
    </Layout>
  )
}

export default Verify
