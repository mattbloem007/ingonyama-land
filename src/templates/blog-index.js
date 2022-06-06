import * as React from "react"
import { Router } from '@reach/router';
import PrivateRoute from "../components/PrivateRoute"
import blogIndexPage from "../components/private/blogIndex"


const BlogIndex = (props) => {

    return (
      <Router>
        <PrivateRoute path="/landlease" component={blogIndexPage} />
      </Router>
    )
}

export default BlogIndex
