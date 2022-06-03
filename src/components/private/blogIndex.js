import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../layout"
import { StaticQuery, graphql } from 'gatsby'
import {
  Container,
  FlexList,
  Box,
  Flex,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../ui"
import { Badge } from "reactstrap"
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  Panel,
  RefinementList,
  Pagination,
  Highlight,
  ClearRefinements
} from 'react-instantsearch-dom';

import './search.css'

const searchClient = algoliasearch(
  'MP8IBX8E2P',
  '25b1d0cb97e8db71b5296a76cf21a19d',
  'ingonyama_properties'
);

function PostCard(props) {
    return (
      <BlockLink to={`/landlease/${props.props.hit._id}/${props.props.hit._source.FARM_NAME}`} state={{ images: props.post[0].image }}>
        {props.post[0].image[0] && (
          <>
            <GatsbyImage alt={props.post[0].image[0].alt} image={props.post[0].image[0].gatsbyImageData} />
            <Space size={3} />
          </>
        )}
        <Subhead>
        <Flex style={{flexDirection: "row"}}>
          <Kicker>{
            props.post[0].categories[0].categories.map(tag => {
              return (
                  <Badge style={{marginRight: "10px", fontSize: "80%"}} color="dark">{tag.tag}</Badge>
              )
            })
          }</Kicker>
          </Flex>
          {props.props.hit._source.FARM_NAME}
        </Subhead>
        <Text as="p">{props.props.hit._source.ADDRESS ? props.props.hit._source.ADDRESS : ""}</Text>
        {props.post[0].author?.name && (
          <Text variant="bold">
            <div>By {props.post[0].author.name}</div>
          </Text>
        )}
      </BlockLink>
    )
//  })
}

function PostCardSmall(props) {
  return (
    <BlockLink {...props} to={`/landlease/${props.post.slug}`}>
      {props.post.image[0] && (
        <>
          <GatsbyImage alt={props.post.image[0].alt} image={props.post.image[0].gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{props.post.category}</Kicker>
        {props.props.hit._source.FARM_NAME}
      </Subhead>
    </BlockLink>
  )
}

const BlogIndexPage = () => {
    return (
      <StaticQuery
      query={graphql`
        query  {
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
      `}
      render={data => {
        console.log("Data", data)
        let posts = data.allDatoCmsBlogpost.nodes
        const featuredPosts = posts.filter((p) => p.category === "Featured")
        const regularPosts = posts.filter((p) => p.category !== "Featured")
        return (
          <Layout>
            <Container>
              {/**<Box paddingY={4}>

                <Heading as="h1">Land for lease</Heading>
                <FlexList variant="start" gap={0} gutter={3} responsive>
                  {featuredPosts.map((post) => (
                    <Box as="li" key={post.id} padding={3} width="half">
                      <PostCard {...post} />
                    </Box>
                  ))}
                </FlexList>
              </Box>
              <Box paddingY={4}>
                <Subhead>Product Updates</Subhead>
                <FlexList responsive wrap gap={0} gutter={3} variant="start">
                  {regularPosts.map((post) => (
                    <Box as="li" key={post.id} padding={3} width="third">
                      <PostCardSmall {...post} />
                    </Box>
                  ))}
                </FlexList>
              </Box>*/}
              < InstantSearch searchClient={searchClient} indexName="ingonyama_properties" >
              <Configure hitsPerPage={8} />
              <div className="search-panel">
                <div className="search-panel__filters">
                  <div className="container-header">
                    <h2>Filters</h2>
                    <div className="clear-filters" data-layout="desktop">
                      <ClearRefinements
                        translations={{
                          reset: (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                              >
                                <g fill="none" fillRule="evenodd" opacity=".4">
                                  <path d="M0 0h11v11H0z" />
                                  <path
                                    fill="#000"
                                    fillRule="nonzero"
                                    d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                                  />
                                </g>
                              </svg>
                              Clear filters
                            </>
                          ),
                        }}
                      />
                  </div>
                  </div>
                  <div className="container-body">
                    <Panel header="Farm Name">
                      <RefinementList attribute="_source.FARM_NAME" />
                    </Panel>
                  </div>
                  <div className="container-body">
                    <Panel header="Useage">
                      <RefinementList attribute="_source.USEAGE" />
                    </Panel>
                  </div>
                </div>
                <Box paddingY={4}>
                  <Heading as="h1">Land for lease</Heading>
                  <Hits hitComponent={(props) => <PostCard post={featuredPosts} props={props}/>}/>
                  <footer className="container-footer">
                    <Pagination
                      padding={2}
                      showFirst={false}
                      showLast={false}
                      translations={{
                        previous: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.143"
                            >
                              <path d="M9 5H1M5 9L1 5l4-4" />
                            </g>
                          </svg>
                        ),
                        next: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.143"
                            >
                              <path d="M1 5h8M5 9l4-4-4-4" />
                            </g>
                          </svg>
                        ),
                      }}
                    />
                  </footer>
                </Box>

                {/**<Box paddingY={4}>
                  <Subhead>Product Updates</Subhead>
                  <FlexList responsive wrap gap={0} gutter={3} variant="start">
                    {regularPosts.map((post) => (
                      <Box as="li" key={post.id} padding={3} width="third">
                        <Hits hitComponent={(props) => <PostCardSmall post={post} props={props}/>}/>
                      </Box>
                    ))}
                  </FlexList>
                </Box>*/}
                {/**<div className="pagination">
                  <Pagination />
                </div>*/}
              </div>
            </InstantSearch >
            </Container>
          </Layout>
        )
      }}
    />

    )
}

const Hit = ({ hit }) => {
  console.log("HIT", hit._source.FARM_NAME)
  return(
    <BlockLink to={`/landlease/${hit._source.FARM_NAME}`}>
      {/**image[0] && (
        <>
          <GatsbyImage alt={image[0].alt} image={image[0].gatsbyImageData} />
          <Space size={3} />
        </>
      )*/}
      <Subhead>
      <Flex style={{flexDirection: "row"}}>
        <Kicker>{/**
          props.categories[0].categories.map(tag => {
            return (
                <Badge style={{marginRight: "10px", fontSize: "80%"}} color="dark">{tag.tag}</Badge>
            )
          })
        */}</Kicker>
        </Flex>
        {hit._source.FARM_NAME}
      </Subhead>
      <Text as="p">{hit._source.ADDRESS ?  hit._source.ADDRESS : ""}</Text>
      {/**author?.name && (
        <Text variant="bold">
          <div>By {author.name}</div>
        </Text>
      )*/}
    </BlockLink>
  )
}


export default BlogIndexPage

// export const query = graphql`
//   query  {
//     allDatoCmsBlogpost {
//       nodes {
//         slug
//         image {
//           gatsbyImageData
//           alt
//           title
//         }
//         category
//         id
//         title
//         excerpt
//       }
//     }
//   }
// `
