module.exports = {
  siteMetadata: {
    author: `@lifeiscontent`,
    description: `Online Presence of Aaron Reisman`,
    image: `/images/social.jpg`,
    title: `lifeiscontent.net`,
    url: 'https://lifeiscontent.net',
  },
  plugins: [
    `gatsby-plugin-image`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog/`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `lifeiscontent.net`,
        short_name: `L:C`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#290070`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // This plugin safely removes the service worker from previous Gatsby versions
    // and ensures that users will get the latest version of your site
    // See: https://www.gatsbyjs.com/plugins/gatsby-plugin-offline/#remove
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-X2P1K4BQHD', // Google Analytics tracking ID
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
  ],
};
