import React from 'react'
import { Router } from '@reach/router';
import { graphql } from 'gatsby'
import Properties from "../components/private/propertyList"
import PrivateRoute from "../components/PrivateRoute"


const PropertyList = (props) => {
  React.useEffect(() => {

  })
    return (
      <Router>
        <PrivateRoute path="/properties" component={Properties} data={props.data} />
      </Router>
    )
}

export default PropertyList

export const query = graphql`
query LesseeInfoQuery {
  allEsPropertiesJson {
      nodes {
        _id
        _source {
          FARMNO
          FARMNAME
          DEEDNO
          DEEDAREA
        }
      }
    }

    allDatoCmsBlogpost {
      nodes {
        slug
        image {
          gatsbyImageData
          alt
          title
        }
        category
        id
        title
        excerpt
        categories {
          ... on DatoCmsCategoryGroup {
            categories {
              tag
            }
          }
        }
      }
    }
}
`
