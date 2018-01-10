import React, { Component } from 'react';
import Article from './components/Article';
import Logo from './components/Logo';
import Section from './components/Section';
import Container from './components/Container';
import Grid from './components/Grid';
import Lead from './components/Lead';
import * as logos from './components/logos';
import contributions from './contributions';

class App extends Component {
  render() {
    return (
      <Article>
        <Section>
          <Container>
            <Logo width="65%" height={undefined} />
            <h1 className="u-text-align--center">Life is content</h1>
            <Lead>Life is just a story and I tell stories through the content I create.</Lead>
          </Container>
        </Section>
        <Section>
          <Container>
            <h2 className="u-text-align--center">Clients</h2>
            <Lead>Here’s some of the clients I’ve done work for in the past.</Lead>
            <Grid>
              {Object.values(logos).map((Logo, key) => (
                <Grid.Cell key={key} sm="1of2" className="u-text-align--center u-margin-bottom--18">
                  <Logo />
                </Grid.Cell>
              ))}
            </Grid>
          </Container>
        </Section>
        <Section>
          <Container>
            <h2 className="u-text-align--center">Open Source</h2>
            <Lead>I’m a big fan of Open Source. Here’s a few projects I’ve contributed to.</Lead>
            <Grid extensions={['gutter-36']}>
              {Object.values(contributions).map((contribution, key) => (
                <Grid.Cell key={key} sm="1of2" className="u-margin-bottom--18">
                  <h3>
                    <a href={contribution.url} target="_blank" rel="noopener">
                      {contribution.title}
                    </a>
                  </h3>
                  <p>{contribution.description}</p>
                </Grid.Cell>
              ))}
            </Grid>
          </Container>
        </Section>
        <Section>
          <Container>
            <h2 className="u-text-align--center">Contact</h2>
            <p>
              You can reach me at{' '}
              <a href="mailto:aaron@lifeiscontent.net">aaron@lifeiscontent.net</a>
            </p>
          </Container>
        </Section>
      </Article>
    );
  }
}

export default App;
