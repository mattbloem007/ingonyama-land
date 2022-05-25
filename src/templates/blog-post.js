import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { Router } from '@reach/router';
import PrivateRoute from "../components/PrivateRoute"
import blogPostPage from "../components/private/blogPost"

const BlogPost = (props) => {
  console.log("data", props.data)
  return (
    <Router>
      <PrivateRoute path="/landlease/:id" component={blogPostPage} context={props.pageContext} data={props.data}/>
    </Router>
  )

  }

  export default BlogPost

export const query = graphql`
  query ($slug: String) {
      datoCmsBlogpost(slug: { eq: $slug }) {
        slug
        id
        excerpt
        title
        image {
          gatsbyImageData
          alt
          url
        }
        body {
          value
        }
        author {
          avatar {
            gatsbyImageData
            url
          }
          name
        }
        date
      }
  }
`
