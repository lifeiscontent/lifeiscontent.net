import React from "react";
import Article from "../components/article";
import Container from "../components/container";
import Section from "../components/section";
import SEO from "../components/seo";
import Typography from "../components/typography";
import Grid from "../components/grid";
import GridCell from "../components/grid-cell";
import { Global, css } from "@emotion/react";
import amgen from "../images/logos/amgen.svg";
import genentech from "../images/logos/genentech.svg";
import johnsonAndJohnson from "../images/logos/johnson-and-johnson.svg";
import mccormick from "../images/logos/mccormick.svg";
import nike from "../images/logos/nike.svg";
import novartis from "../images/logos/novartis.svg";
import icon from "../images/icon.svg";

const styles = css`
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }

  body {
    color: #595959;
    font-family: "Gotham", sans-serif;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  a {
    color: #290070;
    text-decoration: none;
  }
`;

const H1 = Typography.withComponent("h1");
const H2 = Typography.withComponent("h2");
const H3 = Typography.withComponent("h3");
const P = Typography.withComponent("p");

const IndexPage = () => (
  <React.Fragment>
    <SEO title="Home" />
    <Global styles={styles} />
    <Article>
      <Section>
        <Container>
          <img src={icon} width="100%" height="auto" alt="Logo" />
          <H1 textAlign="center">Life is content</H1>
          <P>
            Life is just a story and I tell stories through the content I
            create.
          </P>
        </Container>
      </Section>
      <Section>
        <Container>
          <H2 textAlign="center">Clients</H2>
          <P>Here’s some of the clients I’ve done work for in the past.</P>
          <Grid gutter={36}>
            <GridCell textAlign="center" sm={1 / 2} marginBottom={18}>
              <img src={amgen} alt="AMGEN" width="84" height="54" />
            </GridCell>
            <GridCell textAlign="center" sm={1 / 2} marginBottom={18}>
              <img src={genentech} alt="Genentech" width="84" height="54" />
            </GridCell>
            <GridCell textAlign="center" sm={1 / 2} marginBottom={18}>
              <img src={johnsonAndJohnson} alt="Johnson & johnson" width="84" height="54" />
            </GridCell>
            <GridCell textAlign="center" sm={1 / 2} marginBottom={18}>
              <img src={mccormick} alt="McCormick" width="84" height="54" />
            </GridCell>
            <GridCell textAlign="center" sm={1 / 2} marginBottom={18}>
              <img src={nike} alt="NIKE" width="84" height="54" />
            </GridCell>
            <GridCell textAlign="center" sm={1 / 2} marginBottom={18}>
              <img src={novartis} alt="Novartis" width="84" height="54" />
            </GridCell>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <H2>Open Source</H2>
          <P>
            I’m a big fan of Open Source. Here’s a few projects I’ve contributed
            to.
          </P>
          <Grid gutter={36}>
            <GridCell marginBottom={18} sm={1 / 2}>
              <H3>
                <a
                  href="https://github.com/reactjs/redux"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux
                </a>
              </H3>
              <P>
                Redux is a predictable state container for JavaScript apps. It
                helps you write applications that behave consistently, run in
                different environments (client, server, and native), and are
                easy to test.
              </P>
            </GridCell>
            <GridCell marginBottom={18} sm={1 / 2}>
              <H3>
                <a
                  href="https://github.com/shakacode/react_on_rails"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React on Rails
                </a>
              </H3>
              <P>
                Opinionated and optimal framework for integrating Ruby on Rails
                with modern JavaScript tooling and libraries, including Webpack,
                Babel, React, Redux, React-Router.
              </P>
            </GridCell>
            <GridCell marginBottom={18} sm={1 / 2}>
              <H3>
                <a
                  href="https://github.com/zurb/foundation-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Foundation
                </a>
              </H3>
              <P>
                Foundation is the most advanced responsive front-end framework
                in the world. You can quickly prototype and build sites or apps
                that work on any kind of device with Foundation, which includes
                layout constructs (like a fully responsive grid), elements and
                best practices.
              </P>
            </GridCell>
            <GridCell marginBottom={18} sm={1 / 2}>
              <H3>
                <a
                  href="https://github.com/thoughtbot/bourbon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bourbon
                </a>
              </H3>
              <P>
                A library of pure Sass mixins that are designed to be simple and
                easy to use. No configuration required. The mixins aim to be as
                vanilla as possible, meaning they should be as close to the
                original CSS syntax as possible.
              </P>
            </GridCell>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <H2>Contact</H2>
          <P>
            You can reach me at{" "}
            <a href="mailto:aaron@lifeiscontent.net">aaron@lifeiscontent.net</a>
          </P>
        </Container>
      </Section>
    </Article>
  </React.Fragment>
);

export default IndexPage;
