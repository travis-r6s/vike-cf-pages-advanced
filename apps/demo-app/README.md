# Vike + Cloudflare Pages App

---

This project shows an example of how to use [Vike](https://vike.dev) with [Cloudflare Pages](https://pages.cloudflare.com), utilising SSR with [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/).

> This example project was sponsored by:

## Overview

This is a demo project to showcase using Vike - a Vite SSR plugin - and the Cloudflare Pages hosting platform. These two together provide a fully SSR and/or SPA capable website, hosted on the edge, along with an edge-hosted API to handle data for your site.

TODO: Give more of an overview, on:

- tech used
- what the platforms are, how they are used
- what you can do with them, how you would use them
- the different tech used for these demos, or what the demos are
- layout of code

## Demo Contents

*If you are viewing this on the example project website, then you will see a list of contents on the left hand side.*

1. [**Styling**](#styling)
2. [**Data Fetching**](#data-fetching)
    - [Page Context](#page-context)
    - [REST](#rest)
    - [TRPC](#trpc)
    - [GraphQL](#graphql)
3. [**API Routes**](#api-routes)
    - [REST](#rest-api)
    - [GraphQL](#graphql-api)
4. [**Other Examples**](#other-examples)
    - [Dev-only Page](#development-only-page)
    - [Lazy Page](#lazy-page)
    - [Sentry Error Page](#sentry-error-page)

## Demos

### Styling

- [View Overview](https://vike-cf-pages.pages.dev/styling)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/styling)

This page explains how styling is setup and used in this particular project.

### Data Fetching

Examples to show how you may fetch data for your page, or mutate data.

#### Page Context

- [View Example](https://vike-cf-pages.pages.dev/data/page-context)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/data/page-context)

This example uses [Vike's hooks](https://vike.dev/data-fetching) to fetch data server-side, then add it to the page context. This method embeds the data in the rendered HTML, so there is no client side API request needed once the client side codes loads.

#### REST

- [View Example](https://vike-cf-pages.pages.dev/data/rest)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/data/rest)

This example uses a simple REST API hosted by Cloudflare Functions, and uses [React Query](https://tanstack.com/query/latest/) to handle fetching the data.

#### TRPC

- [View Example](https://vike-cf-pages.pages.dev/data/trpc)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/data/trpc)

This example uses [TRPC](https://trpc.io) to handle fetching and mutating data. It hosts the TRPC server on Cloudflare Functions, and uses [React Query](https://tanstack.com/query/latest/) to fetch data clientside.

#### GraphQL

- [View Example](https://vike-cf-pages.pages.dev/data/graphql)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/data/graphql)

This example uses [Pothos](https://pothos-graphql.dev) and [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) to create a GraphQL schema and server on a Cloudflare Function, then uses [URQL](https://formidable.com/open-source/urql/) to handle fetching and mutating data clientside.

### API Routes

These examples make use of Cloudflare Pages Functions to create various API's. You can use these functions to power your server side API - likely consumed by your client side app, but it could also be a public API.

#### REST API

- [View Example](https://vike-cf-pages.pages.dev/api/rest)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/functions/api/posts)

This is a simple example, that just returns JSON from the Cloudflare Function. It is used by the corresponding data fetching example.

#### GraphQL API

- [View Example](https://vike-cf-pages.pages.dev/api/graphql)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/blob/main/apps/demo-app/functions/api/graphql.ts)

This example uses [Pothos](https://pothos-graphql.dev) and [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) to create a GraphQL schema and server, and uses Yoga to render a GraphQL playground.
You can use the playground to query the data, and view the corresponding data fetching page example to see an end-to-end example in action.

### Other Examples

A collection of other examples that do not fit into the other categories - these may be platform specific.

#### Development Only Page

- [View Example](https://vike-cf-pages.pages.dev/development)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/development)

This is an example of a development-only page. This means that this specific page can only be viewed in development (i.e. when `NODE_ENV=development`) - this is particularly useful for pages in your app that may be for dev use only, for example an internal tool that uploads mock data to a local API.

#### Lazy Page

- [View Example](https://vike-cf-pages.pages.dev/lazy)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/lazy)

This is an example of a page that contains lazy-loaded components. This may be useful when a specific page component imports a large package, and you don't want it to be included in the main app bundle.

#### Sentry Error Page

- [View Example](https://vike-cf-pages.pages.dev/sentry)
- [View Code](https://github.com/travis-r6s/vike-cf-pages/tree/main/apps/demo-app/pages/sentry)

This is a simple example of an uncaught error happening in your app, and it being captured by [Sentry](https://sentry.io/welcome/). It handles sending the error with any context to Sentry, and showing a dialog to capture any extra information from the current user.
