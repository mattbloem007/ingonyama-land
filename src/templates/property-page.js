import * as React from "react"
import { graphql } from 'gatsby'
import { Router } from '@reach/router';
import PrivateRoute from "../components/PrivateRoute"
import PropertyPage from "../components/private/propertyInfo"

const PropertyInfo = (props) => {
  return (
    <Router>
      <PrivateRoute path="/properties/:id/:name" component={PropertyPage} context={props.pageContext} data={props.data} state={props.location.state}/>
    </Router>
  )

  }

  export default PropertyInfo

export const query = graphql`
  query ($_id: String) {
    esPropertiesJson (_id: {eq: $_id }){
          _id
          _source {
            FARMNO
            FARMNAME
            DEEDNO
            DEEDAREA
          }
        }
  }
`
