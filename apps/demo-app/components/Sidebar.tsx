import type { FC } from 'react'
import './Sidebar.scss'

interface MenuLink {
  type: 'link'
  text: string
  /** Enforce relative paths, as we are using clientside routing. */
  route: `/${string}`
  disabled?: boolean
}

interface MenuHeader {
  type: 'header'
  text: string
}

interface MenuSeperator {
  type: 'seperator'
}

/** A radical over-complication, but I like consistency. */
type MenuItem = MenuLink | MenuHeader | MenuSeperator

/**
 * A list of menu links.
 * Maybe this will grow, as more examples are added?
 */
const menuItems: MenuItem[] = [
  {
    type: 'link',
    text: 'Home',
    route: '/',
  },
  {
    type: 'link',
    text: 'About',
    route: '/about',
  },
  {
    type: 'link',
    text: 'Styling',
    route: '/styling',
  },
  {
    type: 'seperator',
  },
  {
    type: 'header',
    text: 'Data Fetching Examples',
  },
  {
    type: 'link',
    text: 'Page Context',
    route: '/data/page-context',
  },
  {
    type: 'link',
    text: 'REST',
    route: '/data/rest',
  },
  {
    type: 'link',
    text: 'TRPC',
    route: '/data/trpc',
  },
  {
    type: 'link',
    text: 'GraphQL',
    route: '/data/graphql',
  },
  {
    type: 'seperator',
  },
  {
    type: 'header',
    text: 'API Examples',
  },
  {
    type: 'link',
    text: 'REST',
    route: '/api/todos',
  },
  {
    type: 'link',
    text: 'GraphQL',
    route: '/api/graphql',
  },
  {
    type: 'seperator',
  },
  {
    type: 'header',
    text: 'Other Examples',
  },
  {
    type: 'link',
    text: 'Dev-only Page',
    route: '/development',
    disabled: import.meta.env.PROD,
  },
  {
    type: 'link',
    text: 'Lazy Page',
    route: '/lazy',
  },
  {
    type: 'link',
    text: 'Sentry Error',
    route: '/sentry',
  },
]

export const Sidebar: FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <p className="tp-title-3">Vike + Pages</p>
        <p className="tp-title-4">Demos</p>
        <hr className="tp-rule" />
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, i) => {
          if (item.type === 'seperator') {
            return (<hr key={i} className="sidebar-menu-seperator tp-rule" />)
          }

          if (item.type === 'header') {
            return (
              <p key={i} className="sidebar-menu-header tp-title-6">{item.text}</p>
            )
          }

          return (
            <a
              key={i}
              href={item.disabled ? '#' : item.route}
              className={`sidebar-menu-link tp-link ${item.disabled ? 'tp-link--secondary' : ''}`}
            >
              {item.text}
            </a>
          )
        })}
      </div>
    </div>
  )
}
