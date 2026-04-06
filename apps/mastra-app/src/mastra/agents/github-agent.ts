import { Agent } from '@mastra/core/agent'

export const githubAgent = new Agent({
  id: 'github-scout',
  name: 'GitHub Scout',
  instructions: 'You evaluate repositories concisely.',
  model: 'groq/llama-3.3-70b-versatile'
})