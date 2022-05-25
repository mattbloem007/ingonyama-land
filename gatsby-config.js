// support for .env, .env.development, and .env.production
require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const pKey = process.env.GATSBY_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")

module.exports = {
  siteMetadata: {
    siteUrl: "https://gatsbydatocmshomepage.gatsbyjs.io/",
    title: "Gatsby DatoCMS Homepage Starter",
    author: `Gatsby`,
    description: "A Gatsby Starter for building homepages with DatoCMS",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/account/*`] },
    },
    {
      resolve: `gatsby-firesource`,
      options: {
        credential: {
          type: process.env.GATSBY_FIREBASE_TYPE,
          project_id: process.env.GATSBY_FIREBASE_PROJECT_ID,
          private_key_id: process.env.GATSBY_FIREBASE_PRIVATE_KEY_ID,
          private_key: pKey,
          client_email: process.env.GATSBY_FIREBASE_CLIENT_EMAIL,
          client_id: process.env.GATSBY_FIREBASE_CLIENT_ID,
          auth_uri: process.env.GATSBY_FIREBASE_AUTH_URI,
          token_uri: process.env.GATSBY_FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.GATSBY_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url:
            process.env.GATSBY_FIREBASE_CLIENT_X509_CERT_URL,
        },
        types: [
          {
            type: "User",
            collection: "users",
            map: doc => ({
              name: doc.name,
              email: doc.email,
            }),
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
        environment: process.env.DATOCMS_ENVIRONMENT,
      },
    },
    "gatsby-plugin-sharp",
    `gatsby-plugin-gatsby-cloud`,
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Starter DatoCMS Homepage",
        short_name: "Gatsby",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#ffffff",
        theme_color: "#db3000",
        icon: "src/favicon.png",
      },
    },
  ],
}
