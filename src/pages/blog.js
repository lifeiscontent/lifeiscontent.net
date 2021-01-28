import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { Global } from '@emotion/react';
import { globals } from '../utils/styles';
import Page from '../components/page';
import Container from '../components/container';
import Nav from '../components/nav';
import Tags from '../components/tags';
import { H2 } from '../components/typography';
import SEO from '../components/seo';

export default function Blog({ data }) {
  const { posts } = data.blog;

  return (
    <React.Fragment>
      <SEO title="Blog" />
      <Global styles={globals} />
      <Nav>
        <Link to="/">Home</Link>
      </Nav>
      <Page>
        <Container>
          <H2>Blog</H2>
          {posts.map((post) => (
            <article key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.title}</h2>
              </Link>
              <small>Last updated on {post.frontmatter.date}</small>
              <Tags>
                {post.frontmatter.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </Tags>

              <p>{post.excerpt}</p>
            </article>
          ))}
        </Container>
      </Page>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true)
          title
          tags
        }
        excerpt
        id
      }
    }
  }
`;

Blog.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.shape({
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          excerpt: PropTypes.string.isRequired,
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }).isRequired,
          frontmatter: PropTypes.shape({
            date: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            title: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
