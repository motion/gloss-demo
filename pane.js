import React from 'react'
import view from './view'
import Theme from './theme'

@view
export class Title {
  // stop propagation so it doesn't include the click in the dblclick
  onClick = e => {
    const { onCollapse } = this.props
    e.stopPropagation()
    onCollapse(e)
  }

  render() {
    const {
      children,
      collapsable,
      collapsed,
      onCollapse,
      after,
      sub,
      hoverable,
      stat,
      ...props
    } = this.props

    return (
      <div onDoubleClick={onCollapse} {...props}>
        <collapse if={collapsable} onClick={this.onClick}>
          {collapsed ? 'UP' : 'DOWN'}
        </collapse>
        <content>
          {children} <stat if={stat}>{stat}</stat>
        </content>
        <after if={after}>{after}</after>
      </div>
    )
  }

  static style = {
    title: {
      padding: [2, 5],
      borderBottom: [1, [0,0,0,0.1]],
      color: [255,255,255],
      flexFlow: 'row',
      alignItems: 'center',
      fontSize: 13,
      fontWeight: 400,
      userSelect: 'none',
    },
    content: {
      flex: 1,
      flexFlow: 'row',
      alignItems: 'center',
    },
    collapse: {
      padding: 5,
      marginRight: 5,
      borderRadius: 3,
      '&:hover': {
        background: [0,0,0,0.1],
      },
    },
    stat: {
      fontSize: 11,
      marginLeft: 5,
      opacity: 0.3,
    },
  }

  static theme = {
    sub: {
      title: {
        padding: [2, 5],
        color: [255,255,255,0.5],
        borderBottom: 'none',
        fontWeight: 300,
      },
    },
    hoverable: {
      title: {
        '&:hover': {
          background: [255,255,255,0.025],
        },
      },
    },
  }
}

@view
export class Section {
  props: {
    collabsable: boolean;
    onSetCollapse: Function;
    activeTab: number;
  }

  static defaultProps = {
    collapsable: false,
    onSetCollapse: () => {},
    activeTab: 0,
  }

  state = {
    collapsed: false,
  }

  componentWillMount() {
    this.setCollapsed(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setCollapsed(nextProps)
  }

  setCollapsed = ({ collapsed }) => {
    this.setState({ collapsed })
  }

  handleCollapse = () => {
    if (this.props.collapsable) {
      const collapsed = !this.state.collapsed
      this.props.onSetCollapse(collapsed)
      this.setState({ collapsed })
    }
  }

  handleTabChange = selectedTab => {
    if (this.props.onChangeTab) {
      this.props.onChangeTab(selectedTab)
    }
    this.setState({ selectedTab })
  }

  render() {
    const {
      collapsable,
      title,
      titleProps,
      height,
      children,
      sub,
      light,
      noflex,
      maxHeight,
      minHeight,
      onSetCollapse,
      onChangeTab,
      activeTab,
      titleStat,
      scrollable,
      collapsed: _collapsed,
      padded,
      ...props
    } = this.props

    const { collapsed, selectedTab } = this.state
    const collapseHeight = sub ? 30 : 30

    return (
      <section
        $height={height}
        $maxHeight={collapsed ? collapseHeight : maxHeight || 'auto'}
        $minHeight={collapsed ? collapseHeight : minHeight}
        {...props}
      >
        <Title
          if={title}
          $noCollapsable={!collapsable}
          collapsable={collapsable}
          collapsed={collapsed}
          onCollapse={this.handleCollapse}
          sub={sub}
          stat={titleStat}
          {...titleProps}
        >
          {title}
        </Title>
        <content $hide={collapsed}>
          {typeof children === 'function' ?
            children(selectedTab) :
            children
          }
        </content>
      </section>
    )
  }

  static style = {
    section: {
      flex: 1,
      background: Theme.color.darkBackground,
      overflow: 'hidden',
    },
    height: height => ({
      flex: 'auto',
      height,
    }),
    maxHeight: maxHeight => ({
      maxHeight,
      minHeight: 'auto',
    }),
    minHeight: minHeight => ({
      minHeight,
    }),
    hide: {
      display: 'none',
    },
    noCollapsable: {
      paddingLeft: 10,
    },
    content: {
      flex: 1,
      position: 'relative',
    },
  }

  static theme = {
    maxHeight: ({ maxHeight }) => ({
      content: {
        maxHeight: maxHeight,
        overflowY: 'auto',
        flex: 1,
      },
    }),
    padded: ({ padded }) => ({
      content: {
        padding: padded === true ? 10 : padded,
      },
    }),
    sub: {
      section: {
        background: Theme.color.darkBackground.lightenByAmount(0.1),
      },
      content: {
        background: Theme.color.darkBackground,
      },
    },
    noflex: {
      section: {
        flex: 'none',
      },
    },
    scrollable: {
      content: {
        overflowY: 'auto',
      },
    },
    light: {
      section: {
        background: Theme.color.background,
        color: Theme.color.text,
      },
    },
  }
}

@view
export class Content {
  render() {
    const { pad, row, noscroll, ...props } = this.props

    return <content {...props} />
  }

  static style = {
    content: {
      flex: 1,
      overflowY: 'auto',
    },
  }

  static theme = {
    pad: {
      content: {
        padding: 10,
      },
    },
    row: {
      content: {
        flexFlow: 'row',
      },
    },
    noscroll: {
      content: {
        overflowY: 'hidden',
      },
    },
  }
}

@view
export default class Pane {
  static Section = Section
  static Title = Title
  static Content = Content

  render() {
    const { children, dark, ...props } = this.props

    return (
      <pane {...props}>
        {children}
      </pane>
    )
  }

  static style = {
    pane: {
      flex: 1,
      borderBottom: [1, Theme.color.darkBackground.darkenByAmount(0.02)],
      background: Theme.color.darkBackground,
      color: Theme.color.darkText,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
    },
  }
}
