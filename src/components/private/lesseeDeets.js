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
import cellEditFactory from 'react-bootstrap-table2-editor';

const columns = [{
  dataField: 'name',
  text: 'Lessee Name'
}, {
  dataField: 'email',
  text: 'Lessee Email',
  editable: false
}, {
  dataField: 'number',
  text: 'Lessee Number'
}];


const LesseeInfo = (props) => {
  const [profile, setProfile] = React.useState(null)
  const { firebase } = useAuth()
  let user = null;
  if (typeof window !== "undefined") {
    user = JSON.parse(window.sessionStorage.getItem('user'))
  }

  if (user) {
    if (profile == null) {
      try {
          firebase.getAllUsers()
          .then((profile) => {
            console.log(profile)
            setProfile(profile)
          })
        }
        catch(err) {
          console.log(err)
        }
    }
  }


    React.useEffect(() => {

    })

      return (
        <Layout>
          <Section padding={4} background="muted">
            <Container>
            {
              profile ? <BootstrapTable
                              keyField='id'
                              data={ profile }
                              columns={ columns }
                              cellEdit={ cellEditFactory({
                                  mode: 'click',
                                  blurToSave: true,
                                  afterSaveCell: (oldValue, newValue, row, column) => {
                                    console.log(row) 
                                    firebase.editUser({docs: row}) }
                                }) }
                               />
              :
              <div></div>

            }
            </Container>
          </Section>
        </Layout>
      )
  }

export default LesseeInfo
