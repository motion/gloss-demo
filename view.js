// @flow
import gloss from 'gloss'
import React from 'react'

const styled = gloss({
  baseStyles: {
    // some $$ styles
    fullscreen: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
})

export default function view(Component: Object) {
  // extends react
  Object.setPrototypeOf(Component.prototype, React.Component.prototype)

  // do other things...

  return styled(Component)
}
