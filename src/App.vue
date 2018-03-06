<template>
  <div id="app">
    <Article>
      <Section>
        <Container>
          <Logo width="65%" :height="undefined" />
          <h1 class="u-text-align--center">Life is content</h1>
          <Lead>
            Life is just a story and I tell stories through the content I
            create.
          </Lead>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 class="u-text-align--center">Clients</h2>
          <Lead>
            Here’s some of the clients I’ve done work for in the past.
          </Lead>
          <Grid>
            <GridCell
              sm="1of2"
              class="u-text-align--center u-margin-bottom--18"
            >
              <Amgen />
            </GridCell><GridCell
              sm="1of2"
              class="u-text-align--center u-margin-bottom--18"
            >
              <Genentech />
            </GridCell><GridCell
              sm="1of2"
              class="u-text-align--center u-margin-bottom--18"
            >
              <JohnsonAndJohnson />
            </GridCell><GridCell
              sm="1of2"
              class="u-text-align--center u-margin-bottom--18"
            >
              <Mccormick />
            </GridCell><GridCell
              sm="1of2"
              class="u-text-align--center u-margin-bottom--18"
            >
              <Nike />
            </GridCell><GridCell
              sm="1of2"
              class="u-text-align--center u-margin-bottom--18"
            >
              <Novartis />
            </GridCell>
          </Grid>

        </Container>
      </Section>
      <Section>
        <Container>
          <h2 class="u-text-align--center">Open Source</h2>
          <Lead>
            I’m a big fan of Open Source. Here’s a few projects I’ve
            contributed to.
          </Lead>
          <Grid :extensions="['gutter-36']">
              <GridCell :key="key" sm="1of2" class="u-margin-bottom--18" v-for="(contribution, key) in contributions">
                <h3>
                  <a :href="contribution.url" target="_blank" rel="noopener">
                    {{contribution.title}}
                  </a>
                </h3>
                <p>{{contribution.description}}</p>
              </GridCell>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 class="u-text-align--center">Contact</h2>
          <p>
            You can reach me at
            <a href="mailto:aaron@lifeiscontent.net">
              aaron@lifeiscontent.net
            </a>
          </p>
        </Container>
      </Section>
    </Article>
  </div>
</template>

<script>
import Amgen from './components/Amgen'
import Article from './components/Article'
import Container from './components/Container'
import Genentech from './components/Genentech'
import Grid from './components/Grid'
import GridCell from './components/GridCell'
import JohnsonAndJohnson from './components/JohnsonAndJohnson'
import Lead from './components/Lead'
import Logo from './components/Logo'
import Mccormick from './components/Mccormick'
import Nike from './components/Nike'
import Novartis from './components/Novartis'
import Section from './components/Section'

export default {
  name: 'App',
  components: {
    Amgen,
    Article,
    Container,
    Genentech,
    Grid,
    GridCell,
    JohnsonAndJohnson,
    Lead,
    Logo,
    Mccormick,
    Nike,
    Novartis,
    Section
  },
  data () {
    return {
      contributions: [
        {
          title: 'Redux',
          description:
            'Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.',
          url: 'https://github.com/reactjs/redux'
        },
        {
          title: 'React on Rails',
          description:
            'Opinionated and optimal framework for integrating Ruby on Rails with modern JavaScript tooling and libraries, including Webpack, Babel, React, Redux, React-Router.',
          url: 'https://github.com/shakacode/react_on_rails'
        },
        {
          title: 'Foundation',
          description:
            'Foundation is the most advanced responsive front-end framework in the world. You can quickly prototype and build sites or apps that work on any kind of device with Foundation, which includes layout constructs (like a fully responsive grid), elements and best practices.',
          url: 'https://github.com/zurb/foundation-sites'
        },
        {
          title: 'Bourbon',
          description:
            'A library of pure Sass mixins that are designed to be simple and easy to use. No configuration required. The mixins aim to be as vanilla as possible, meaning they should be as close to the original CSS syntax as possible.',
          url: 'https://github.com/thoughtbot/bourbon'
        }
      ]
    }
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  color: #595959;
  font-family: 'Gotham', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 30px;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 18px;
}

h1,
h2,
h3 {
  color: #222;
  text-transform: uppercase;
}

a {
  color: #290070;
  text-decoration: none;
}

.u-text-align--center {
  text-align: center !important;
}

.u-text-align--left {
  text-align: left !important;
}

.u-margin-bottom--18 {
  margin-bottom: 18px !important;
}
</style>
