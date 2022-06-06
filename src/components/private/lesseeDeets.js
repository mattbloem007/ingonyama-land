import React from 'react'
import { useState } from 'react'
import { Link } from 'gatsby'
import Layout from "../layout"
import { useAuth } from "../Firebase"
import {
  Container,
  Section,
  Button,
  Flex,
  BlockLink
} from "../ui"
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'name',
  text: 'Lessee Name'
}, {
  dataField: 'email',
  text: 'Lessee Email'
}, {
  dataField: 'number',
  text: 'Lessee Number'
}];


const LesseeInfo = (props) => {
  const [profile, setProfile] = React.useState(null)
  const [formValues, setFormValues] = useState({ name: "", number: "", role: "" })
  const { firebase } = useAuth()
  let tableData = []

  let user = null;
  if (typeof window !== "undefined") {
    user = JSON.parse(window.sessionStorage.getItem('user'))
  }

  if (user) {
    if (profile == null) {
      console.log("her in")
      try {
          firebase.getUserProfile({userId: user.uid})
          .then((profile) => {
            setProfile(profile)
          })
        }
        catch(err) {
          console.log(err)
        }
    }
  }

  if (profile) {
      tableData.push(profile)
  }

    console.log("TABLE DATA", tableData)

    React.useEffect(() => {

    })

      return (
        <Layout>
          <Section padding={4} background="muted">
            <Container>
            {
              tableData ? <BootstrapTable keyField='id' data={ tableData } columns={ columns } />
              :
              <div></div>

            }
            </Container>
          </Section>
        </Layout>
      )
  }

export default LesseeInfo
