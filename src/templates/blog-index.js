import * as React from "react"
import { Router } from '@reach/router';
import PrivateRoute from "../components/PrivateRoute"
import blogIndexPage from "../components/private/blogIndex"

// function PostCard({ slug, image, title, excerpt, author, category, ...props }) {
//   return (
//     <BlockLink {...props} to={`landlease/${slug}`}>
//       {image[0] && (
//         <>
//           <GatsbyImage alt={image[0].alt} image={image[0].gatsbyImageData} />
//           <Space size={3} />
//         </>
//       )}
//       <Subhead>
//         <Kicker>{category}</Kicker>
//         {title}
//       </Subhead>
//       <Text as="p">{excerpt}</Text>
//       {author?.name && (
//         <Text variant="bold">
//           <div>By {author.name}</div>
//         </Text>
//       )}
//     </BlockLink>
//   )
// }
//
// function PostCardSmall({ slug, image, title, category, ...props }) {
//   return (
//     <BlockLink {...props} to={`landlease/${slug}`}>
//       {image[0] && (
//         <>
//           <GatsbyImage alt={image[0].alt} image={image[0].gatsbyImageData} />
//           <Space size={3} />
//         </>
//       )}
//       <Subhead>
//         <Kicker>{category}</Kicker>
//         {title}
//       </Subhead>
//     </BlockLink>
//   )
// }
//

const BlogIndex = () => {

    return (
      <Router>
        <PrivateRoute path="/landlease" component={blogIndexPage} />
      </Router>
    )
}

export default BlogIndex

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
