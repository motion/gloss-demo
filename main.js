// @flow
import React from 'react'
import Pane, { Section } from './pane'

class Main extends React.Component {
  render() {
    return (
      <Pane>
        <Section title="Something">
          <Section title="Something" sub collapsable>
            Collapse me up
          </Section>

          <Section title="Something" sub collapsable>
            Collapse me up
          </Section>

          <Section title="Something" sub collapsable>
            Collapse me up
          </Section>
        </Section>
      </Pane>
    )
  }
}

export default Main
