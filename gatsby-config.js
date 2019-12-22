module.exports = {
  siteMetadata: {
    title: `lifeiscontent.net`,
    description: `Online Presence of Aaron Reisman`,
    author: `@lifeiscontent`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `lifeiscontent.net`,
        short_name: `L:C`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#290070`,
        display: `minimal-ui`,
        icon: `src/images/icon.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-eslint`
  ],
}
