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

const PropertyPage = (props) => {

    let pageContext = props.context;
    let blogPost = props.data.esPropertiesJson
    console.log("Props", props)
        return (
          <Layout description={blogPost._source.FARMNAME}>
            <Container>
              <Box paddingY={5}>
                <Heading as="h1">
                  {blogPost._source.FARMNAME}
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
                <Text>{blogPost._source.FARMNO}</Text>
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
                    <p className={styles.blogPost}>Deed No: {blogPost._source.DEEDNO}</p>
                    <p className={styles.blogPost}>Deed Area: {blogPost._source.DEEDAREA}</p>
                  </div>
                </Flex>
              </Box>
            </Container>
          </Layout>
        )
}

export default PropertyPage
