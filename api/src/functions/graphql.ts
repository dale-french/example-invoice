import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'
import { db } from 'src/lib/db'

import services from 'src/services/**/*.{ts,js}'
import schemas from 'src/graphql/**/*.{ts,js}'

import { getCurrentUser } from 'src/lib/auth'

export const handler = createGraphQLHandler({
  getCurrentUser,
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services }),
  }),
  onException: () => {
    db.disconnect()
  },
})
