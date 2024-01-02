import {createConsola} from 'consola'

const defaultTag = 'vike-cf'

export const logger = createConsola({
  defaults: {
    tag: defaultTag
  }
})
