import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../layout"
import { StaticQuery, graphql } from 'gatsby'
import {
  Container,
  FlexList,
  Box,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../ui"

function PostCard({ slug, image, title, excerpt, author, category, ...props }) {
  return (
    <BlockLink {...props} to={`/landlease/${slug}`}>
      {image[0] && (
        <>
          <GatsbyImage alt={image[0].alt} image={image[0].gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
      <Text as="p">{excerpt}</Text>
      {author?.name && (
        <Text variant="bold">
          <div>By {author.name}</div>
        </Text>
      )}
    </BlockLink>
  )
}

function PostCardSmall({ slug, image, title, category, ...props }) {
  return (
    <BlockLink {...props} to={`/landlease/${slug}`}>
      {image[0] && (
        <>
          <GatsbyImage alt={image[0].alt} image={image[0].gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
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
              <Box paddingY={4}>
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
              </Box>
            </Container>
          </Layout>
        )
      }}
    />

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
