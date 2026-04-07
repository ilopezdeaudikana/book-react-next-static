import { Mastra } from '@mastra/core'
import { githubAgent } from './agents/github-agent'
import { githubWorkflow } from './workflows/github-workflow'
import { PinoLogger } from '@mastra/loggers'
import { LibSQLStore } from '@mastra/libsql'
import { registerApiRoute } from '@mastra/core/server'
import { VercelDeployer } from '@mastra/deployer-vercel'

const getSafeErrorMessage = (message?: string) => {
  const normalized = message?.toLowerCase() ?? ''

  if (
    normalized.includes('tokens per minute') ||
    normalized.includes('rate limit') ||
    normalized.includes('limit 12000')
  ) {
    return 'The AI summary is temporarily unavailable because the model rate limit was reached.'
  }

  if (normalized.includes('empty request body')) {
    return 'Please enter a search topic.'
  }

  if (normalized.includes('no repositories found')) {
    return 'No matching repositories were found for that search.'
  }

  return 'We could not generate recommendations right now.'
}

export const mastra = new Mastra({
  logger: new PinoLogger({
    name: 'github-crawler',
    level: 'debug'
  }),
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
          const logger = mastra.getLogger()

          try {
            const rawBody = await c.req.text()
            if (!rawBody || !rawBody.trim()) {
              logger.error('Empty request body. Expected JSON.')
              return c.json({ error: getSafeErrorMessage('empty request body') }, 400)
            }
            const parsedBody = JSON.parse(rawBody)

            const workflow = mastra.getWorkflow('githubWorkflow')
            const run = await workflow.createRun()
            const result = await run.start({ inputData: parsedBody })

            if (result.status === 'failed') {
              logger.error('Summary generation failed', result.error)
              return c.json({ error: getSafeErrorMessage(result.error.message) }, 500)
            }

            if (result.status === 'tripwire') {
              logger.error('Workflow hit tripwire', JSON.stringify(result.tripwire))
              return c.json({ error: 'This search could not be processed safely. Please try a different query.' }, 500)
            }

            if (result.status !== 'success') {
              logger.error(`Workflow ended with status: ${result.status}`)
              return c.json({ error: 'We could not generate recommendations right now.' }, 500)
            }


            return c.json(result)

          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            logger.error(`Summary generation failed. Unexpected ${message}`)

            return c.json(
              {
                error: getSafeErrorMessage(message),
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
