import { Mastra } from '@mastra/core'
import { githubWorkflow } from './workflows/github-workflow'
import { LibSQLStore } from '@mastra/libsql'
import { registerApiRoute } from '@mastra/core/server'
import { VercelDeployer } from '@mastra/deployer-vercel'
// @repo shortcut doesn't work
import { getUserFacingError } from '../../../../packages/utils/get-error-message'
import { githubAgent } from './agents/github-agent'

export const mastra = new Mastra({
  logger: false,
  storage: new LibSQLStore({
    id: 'in-memory-id',
    // This tells LibSQL to run entirely in RAM
    url: ':memory:',
  }),
  agents: { githubAgent },
  workflows: { githubWorkflow },
  server: {
    apiRoutes: [
      registerApiRoute('/summarize', {
        method: 'POST',
        handler: async (c) => {
          const mastra = c.get('mastra')

          try {
            const rawBody = await c.req.text()
            const parsedBody = JSON.parse(rawBody)

            const workflow = mastra.getWorkflow('githubWorkflow')
            const run = await workflow.createRun()
            const result = await run.start({ inputData: parsedBody })

            // console.log('RESULT', result)

            if (result.status !== 'success') {
              console.error(`Workflow ended with status: ${result.status}`)
              const message = result.status === 'failed' ? result.error.message : 'We could not generate recommendations right now.'
              return c.json({ error: message }, 500)
            }

            return c.json(result)

          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            console.error(`Summary generation failed. Unexpected ${message}`)

            return c.json(
              {
                error: getUserFacingError(message),
              },
              500
            )
          }
        },
      }),
    ]
  },
  deployer: new VercelDeployer()
})
