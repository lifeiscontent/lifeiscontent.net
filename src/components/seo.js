/**
 * SEO component for Gatsby sites
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  return (
    <>
      <title>
        {title
          ? `${title} | ${site.siteMetadata.title}`
          : site.siteMetadata.title}
      </title>
      <meta
        name="description"
        content={description || site.siteMetadata.description}
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || site.siteMetadata.description}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description || site.siteMetadata.description}
      />
      {children}
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default SEO;
