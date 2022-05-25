import React from 'react'
import { useState } from 'react'
import { Link } from 'gatsby'
import Layout from "../components/layout"
import { useAuth } from "../components/Firebase"
import { Router, navigate } from '@reach/router';
import AccountPage from "../components/private/account"
import {
  Container,
  Section,
  Button,
  Flex
} from "../components/ui"
import { Form, Label, Input } from "reactstrap"
import PrivateRoute from "../components/PrivateRoute"


const Account = () => {
  React.useEffect(() => {

  })
    return (
      <Router>
        <PrivateRoute path="/account" component={AccountPage} />
      </Router>
    )
}

export default Account
