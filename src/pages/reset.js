import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, navigate } from 'gatsby'
import { useAuth } from "../components/Firebase"
import { ResetDiv, ResetContainer, ResetTextBox, ResetBtn } from "../components/common"
import Layout from "../components/layout"
import {
  Container,
  Section,
  Flex
} from "../components/ui"

const Reset = () => {
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
          <ResetTextBox
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <ResetBtn
            onClick={() => firebase.sendPasswordReset(email)}
          >
            Send password reset email
          </ResetBtn>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </Flex>
      </Container>
     </Section>
    </Layout>
  )
}

export default Reset
