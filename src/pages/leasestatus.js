import React from 'react'
import { Router } from '@reach/router';
import { graphql } from 'gatsby'
import LeaseStatus from "../components/private/leaseStatus"
import PrivateRoute from "../components/PrivateRoute"


const LeasesTable = (props) => {
  React.useEffect(() => {

  })
    return (
      <Router>
        <PrivateRoute path="/leasestatus" component={LeaseStatus} data={props.data} />
      </Router>
    )
}

export default LeasesTable

export const query = graphql`
query LeaseStatusQuery {
  allEsLeasesJson {
      nodes {
        _id
        _source {
          LESSEENAME
          FARM_NAME
          ADDRESS
          STATUS
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
