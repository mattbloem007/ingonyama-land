import React from 'react'
import { useState } from 'react'
import { Link } from 'gatsby'
import Layout from "../layout"
import { useAuth } from "../Firebase"
import {
  Container,
  Section,
  Button,
  Flex
} from "../ui"
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'FARM_NAME',
  text: 'Farm Name'
}, {
  dataField: 'ADDRESS',
  text: 'Address'
}, {
  dataField: 'STATUS',
  text: 'Status'
}];


const LeaseStatus = (props) => {
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
    props.data.allEsLeasesJson.nodes.filter(node => node._source.LESSEENAME == profile.name).map(filteredList => {
      tableData.push(filteredList._source)
    })

    console.log("TABLE DATA", tableData)
  }

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

export default LeaseStatus
