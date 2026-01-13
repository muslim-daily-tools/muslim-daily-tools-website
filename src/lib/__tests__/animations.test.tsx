import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimationProvider,
} from '../animations'

// Mock framer-motion's useReducedMotion hook
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    useReducedMotion: vi.fn(() => false),
  }
})

describe('AnimationProvider', () => {
  it('renders children correctly', () => {
    render(
      <AnimationProvider>
        <div data-testid="child">Test content</div>
      </AnimationProvider>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})

describe('FadeIn', () => {
  it('renders children correctly', () => {
    render(
      <AnimationProvider>
        <FadeIn>
          <p data-testid="content">Hello World</p>
        </FadeIn>
      </AnimationProvider>
    )

    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies className when provided', () => {
    render(
      <AnimationProvider>
        <FadeIn className="custom-class" data-testid="fade-wrapper">
          <span>Content</span>
        </FadeIn>
      </AnimationProvider>
    )

    const wrapper = screen.getByTestId('fade-wrapper')
    expect(wrapper).toHaveClass('custom-class')
  })

  it('renders as different element when "as" prop is provided', () => {
    render(
      <AnimationProvider>
        <FadeIn as="section" data-testid="section-element">
          <span>Section content</span>
        </FadeIn>
      </AnimationProvider>
    )

    const element = screen.getByTestId('section-element')
    expect(element.tagName.toLowerCase()).toBe('section')
  })
})

describe('FadeIn with reduced motion', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('renders without animation when reduced motion is preferred', async () => {
    // Re-mock with reduced motion enabled
    vi.doMock('framer-motion', async () => {
      const actual = await vi.importActual('framer-motion')
      return {
        ...actual,
        useReducedMotion: () => true,
      }
    })

    // Re-import to get the mocked version
    const { FadeIn: FadeInReduced, AnimationProvider: AP } = await import(
      '../animations'
    )

    render(
      <AP>
        <FadeInReduced data-testid="reduced-motion">
          <span>No animation</span>
        </FadeInReduced>
      </AP>
    )

    // Should still render children
    expect(screen.getByText('No animation')).toBeInTheDocument()
  })
})

describe('StaggerContainer', () => {
  it('renders children correctly', () => {
    render(
      <AnimationProvider>
        <StaggerContainer data-testid="stagger-container">
          <div>Item 1</div>
          <div>Item 2</div>
        </StaggerContainer>
      </AnimationProvider>
    )

    expect(screen.getByTestId('stagger-container')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })
})

describe('StaggerItem', () => {
  it('renders children correctly', () => {
    render(
      <AnimationProvider>
        <StaggerContainer>
          <StaggerItem data-testid="stagger-item">
            <span>Staggered content</span>
          </StaggerItem>
        </StaggerContainer>
      </AnimationProvider>
    )

    expect(screen.getByTestId('stagger-item')).toBeInTheDocument()
    expect(screen.getByText('Staggered content')).toBeInTheDocument()
  })
})

describe('Animation integration', () => {
  it('renders nested animation components correctly', () => {
    render(
      <AnimationProvider>
        <FadeIn data-testid="outer">
          <StaggerContainer data-testid="container">
            <StaggerItem data-testid="item-1">
              <span>Item 1</span>
            </StaggerItem>
            <StaggerItem data-testid="item-2">
              <span>Item 2</span>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>
      </AnimationProvider>
    )

    expect(screen.getByTestId('outer')).toBeInTheDocument()
    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByTestId('item-1')).toBeInTheDocument()
    expect(screen.getByTestId('item-2')).toBeInTheDocument()
  })
})
