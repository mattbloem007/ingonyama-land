import * as React from "react"
import { graphql } from 'gatsby'
import { Router } from '@reach/router';
import PrivateRoute from "../components/PrivateRoute"
import blogPostPage from "../components/private/blogPost"

const BlogPost = (props) => {
  return (
    <Router>
      <PrivateRoute path="/landlease/:id/:name" component={blogPostPage} context={props.pageContext} data={props.data} state={props.location.state}/>
    </Router>
  )

  }

  export default BlogPost

export const query = graphql`
  query ($_id: String) {
      esLeasesJson (_id: {eq: $_id }) {
          _id
          _source {
            ADDRESS
            FARM_NAME
            PROP_DESC
            STATUS
            USEAGE
            LESSEENAME
          }
      }
  }
`
