import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DependencyPanel } from './DependencyPanel'

describe('DependencyPanel', () => {
  it('renders dependency links and handles clicks', async () => {
    const user = userEvent.setup()
    const onDependencyClick = vi.fn()
    const dependencies = [
      { fidesKey: 'alpha', name: 'Alpha System' },
      { fidesKey: 'beta', name: 'Beta System' },
    ]

    render(
      <DependencyPanel dependencies={dependencies} onDependencyClick={onDependencyClick} />,
    )
    const menu = screen.getByText('Dependencies (2)')
    await user.click(menu)
    const alpha = screen.getByText('Alpha System')
    await user.click(alpha)

    expect(onDependencyClick).toHaveBeenCalledWith('alpha')
  })
})
