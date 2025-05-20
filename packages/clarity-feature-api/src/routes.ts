import ZodRoute from 'zod-route-schemas'
import z from 'zod'
import semver from 'semver'

export const customFeatureAssetRoute = new ZodRoute(
  '/customfeatureassets/:feature/:version/:environment/:filename',
  z.strictObject({
    feature: z.string().transform((s) => decodeURIComponent(s)),
    version: z.string().refine((version) => semver.valid(version)),
    environment: z.enum(['client', 'server']),
    filename: z.string().regex(/^[^/]+$/g),
  }),
  {
    formatSchema: z.strictObject({
      feature: z.string(),
      version: z.string().refine((version) => semver.valid(version)),
      environment: z.enum(['client', 'server']),
      filename: z.string().regex(/^[^/]+$/g),
    }),
  }
)
