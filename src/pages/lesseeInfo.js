import React from 'react'
import { Router } from '@reach/router';
import { graphql } from 'gatsby'
import LesseeInfo from "../components/private/lesseeDeets"
import PrivateRoute from "../components/PrivateRoute"


const LesseeTable = (props) => {
  React.useEffect(() => {

  })
    return (
      <Router>
        <PrivateRoute path="/lesseeInfo" component={LesseeInfo} />
      </Router>
    )
}

export default LesseeTable
