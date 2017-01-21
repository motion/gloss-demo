// @flow
import React from 'react'
import Pane, { Section } from './pane'
import Button from './button'

class Main extends React.Component {
  render() {
    return (
      <Pane>
        <Section title="Something">
          <Section title="Something" sub collapsable>
            Collapse me up

            <Button color="green">Test this button</Button>
            <Button color="red">Test this button</Button>
            <Button bordered color="yellow">Test this button</Button>
            <Button bordered color="red">Test this button</Button>
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
