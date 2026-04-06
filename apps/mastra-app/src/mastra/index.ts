import { Mastra } from '@mastra/core'
import { githubAgent } from './agents/github-agent'
import { githubWorkflow } from './workflows/github-workflow'
import { PinoLogger } from '@mastra/loggers'
import { LibSQLStore } from '@mastra/libsql'
import { registerApiRoute } from '@mastra/core/server'
import { VercelDeployer } from '@mastra/deployer-vercel'

export const mastra = new Mastra({
  logger: new PinoLogger({
    name: 'github-crawler',
    level: 'debug'
  }),
  storage: new LibSQLStore({
    id: 'in-memory',
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
              logger.error('Empty request body. Expected JSON.', 400)
            }
            const parsedBody = JSON.parse(rawBody)

            // logger.debug(parsedBody)

            const workflow = mastra.getWorkflow('githubWorkflow')
            const run = await workflow.createRun()
            const result = await run.start({ inputData: parsedBody })

            if (result.status !== 'success') {
              logger.error('Summary generation failed', JSON.stringify(result))
              return c.json(
                {
                  error: 'Summary generation failed.',
                },
                500
              )
            }
            
            return c.json(result)

          } catch (error) {
            logger.error('Unexpected summary generation error')
            return logger.error(`Summary generation failed. Unexpected ${error}`)
          }
        },
      }),
    ]
  },
  deployer: new VercelDeployer()
})