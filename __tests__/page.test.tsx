import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

// Maybe try just using Playwright?
test('Page', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1, name: 'Choose your character' })).toBeDefined()
})