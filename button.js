import React from 'react'
import view from './view'
import Theme from './theme'

const getColors = (baseColor, strength = 0) => {
  const luminance = baseColor.getLuminance()
  const isLight = luminance > 0.7
  const adjuster = isLight ? 'darkenByAmount' : 'lightenByAmount'
  const background = baseColor[adjuster](strength)
  const color = background.setLightness(isLight ? 0.3 : 1)
  return { background, color, isLight }
}

const getBorderedColors = (...args) => {
  const { background } = getColors(...args)
  return {
    color: background,
    border: [1, background],
    background: 'transparent',
  }
}

const RADIUS = 6

@view
export default class Button {
  props: {
    fullwidth: Boolean;
    flex: Number;
    color: String | Function;
  }

  static defaultProps = {
    color: Theme.color.text,
  }

  render() {
    const {
      children,
      sharp,
      color,
      bordered,
      small,
      large,
      ...props
    } = this.props

    return (
      <button
        $bordered={bordered}
        {...props}
      >
        {children}
      </button>
    )
  }

  static style = {
    button: {
      borderRadius: RADIUS,
      padding: [0, 12],
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 400,
      outline: 'none',
      flexFlow: 'row',
      position: 'relative',
      userSelect: 'none',
    },
  }

  static theme = {
    large: {
      button: {
        fontSize: 18,
        padding: [0, 20],
        height: 42,
        borderRadius: 6,
      },
    },
    small: {
      button: {
        fontSize: 13,
        height: 26,
        padding: [0, 8],
      },
    },
    color: ({ color }) => {
      if (color === 'transparent') {
        return {
          button: {
            background: 'transparent',
            border: 'none',
            color: Theme.color.text,
          },
        }
      }

      const base = Theme.makeColor(color)
      const { isLight, ...regular } = getColors(base)
      const bordered = getBorderedColors(base)

      return {
        button: {
          border: 'none',
          ...regular,
          '&:hover': {
            background: isLight ?
              regular.background.darkenByAmount(0.025) :
              regular.background.lightenByAmount(0.05),
          },
          '&:active': {
            background: regular.background.darkenByAmount(0.08),
          },
        },
        bordered: {
          ...bordered,
          '&:hover': {
            borderColor: bordered.color.lightenByAmount(0.1),
          },
        },
      }
    },
  }
}
