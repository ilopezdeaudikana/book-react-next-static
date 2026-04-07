import { Agent } from '@mastra/core/agent'
import { crawlerTool, readmeTool, searchTool } from '../tools/github-tools'

export const githubAgent = new Agent({
  id: 'github-scout',
  name: 'GitHub Scout',
  instructions: `
    You evaluate GitHub repositories for a topic.
    Base recommendations on concrete signals like stars, forks, descriptions, README content, and file structure.
    If asked to choose a repository from a list, respond with the exact full repository name only.
    If asked to explain the choice, keep it concise, practical, and grounded in the evidence provided.
  `,
  model: 'groq/llama-3.3-70b-versatile',
  tools: {
    searchTool,
    crawlerTool,
    readmeTool,
  },
})
