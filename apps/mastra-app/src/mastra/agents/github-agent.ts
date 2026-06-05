import { Agent } from '@mastra/core/agent'

export const githubAgent = new Agent({
  id: 'github-scout',
  name: 'GitHub Scout',
  instructions: `
    Compare the provided GitHub stats against the user's target topic.
    CRITICAL: Your entire response must be under 150 words.
    Structure your response as a Markdown table comparing:
    | Repo Name | Topic Fit (1-5) | Maintenance Status | Verdict |
    The table cells and headers should be aligned to the left
    Follow the table with a 2-sentence maximum summary.
  `,
  model: 'groq/llama-3.3-70b-versatile'
})