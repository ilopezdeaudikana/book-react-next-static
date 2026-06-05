export const getUserFacingError = (message?: string) => {
  const normalized = message?.toLowerCase() ?? ''

  if (
    normalized.includes('tokens per minute') ||
    normalized.includes('rate limit') ||
    normalized.includes('limit 12000')
  ) {
    return 'The AI summary is temporarily unavailable because the model rate limit was reached. Try a shorter search or try again in a moment.'
  }

  if (normalized.includes('empty request body')) {
    return 'Please enter a search topic.'
  }

  if (normalized.includes('blocked by tripwire')) {
    return 'This search could not be processed safely. Please try a different query.'
  }

  if (normalized.includes('no repositories found')) {
    return 'No matching repositories were found for that search.'
  }

  return 'We could not generate recommendations right now. Please try again.'
}