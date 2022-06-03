import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../layout"
import { StaticQuery, graphql } from 'gatsby'
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../ui"
import { avatar as avatarStyle } from "../ui.css"
import * as styles from "../../templates/blog-post.css"
import { StructuredText } from "react-datocms";
import ImageGalleryComponent from "../common/ImageGalleryComponent"
import plot from "../../../docs/images/plot.png"

const BlogPostPage = (props) => {

    let pageContext = props.context;
    let blogPost = props.data.esLeasesJson
    
        return (
          <Layout description={blogPost._source.PROP_DESC}>
            <Container>
              <Box paddingY={5}>
                <Heading as="h1">
                  {blogPost._source.FARM_NAME}
                </Heading>
                <Space size={4} />
                {/** blogPost.author && (
                  <Box center>
                    <Flex>
                      {blogPost.author.avatar &&
                        (!!blogPost.author.avatar.gatsbyImageData ? (
                          <Avatar
                            {...blogPost.author.avatar}
                            image={blogPost.author.avatar.gatsbyImageData}
                          />
                        ) : (
                          <img
                            src={blogPost.author.avatar.url}
                            alt={blogPost.author.name}
                            className={avatarStyle}
                          />
                        ))}
                      <Text variant="bold">{blogPost.author.name}</Text>
                    </Flex>
                  </Box>
                )*/}
                <Space size={4} />
                <Text>{blogPost._source.FARM_NAME}</Text>
                <Space size={4} />
                <Flex style={{alignItems: "flex-start"}}>
                  {/**blogPost.image && (
                    <GatsbyImage
                      style={{width: "50%"}}
                      alt={blogPost.image.alt}
                      image={blogPost.image.gatsbyImageData}
                    />
                  )*/}
                  <ImageGalleryComponent images={props.state.images}/>
                  <Space size={3} />
                  <div>
                    <p className={styles.blogPost}>{blogPost._source.PROP_DESC}</p>
                  </div>
                </Flex>
              </Box>
            </Container>
          </Layout>
        )
}

export default BlogPostPage

// const query = graphql`
//   query ($id: String) {
//       datoCmsBlogpost(id: { eq: $id }) {
//         slug
//         id
//         excerpt
//         title
//         image {
//           gatsbyImageData
//           alt
//           url
//         }
//         body {
//           value
//         }
//         author {
//           avatar {
//             gatsbyImageData
//             url
//           }
//           name
//         }
//         date
//       }
//   }
// `
