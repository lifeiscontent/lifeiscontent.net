import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Markdown from '../components/markdown';
import { Global } from '@emotion/react';
import { globals } from '../utils/styles';
import Page from '../components/page';
import Container from '../components/container';
import Tags from '../components/tags';
import Nav from '../components/nav';
import SEO from '../components/seo';
import { H2, P } from '../components/typography';
import Article from '../components/article';

export default function BlogPost({ data }) {
  const post = data.markdownRemark;

  return (
    <React.Fragment>
      <SEO title={post.frontmatter.title} />
      <Global styles={globals} />
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
      </Nav>
      <Page>
        <Container>
          <Article>
            <H2>{post.frontmatter.title}</H2>
            <P>
              Last updated on{' '}
              <time dateTime={post.frontmatter.date}>
                {Intl.DateTimeFormat().format(new Date(post.frontmatter.date))}
              </time>
            </P>
            <Tags>
              {post.frontmatter.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </Tags>
            <Markdown dangerouslySetInnerHTML={{ __html: post.html }} />
          </Article>
        </Container>
      </Page>
    </React.Fragment>
  );
}
export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.shape.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
