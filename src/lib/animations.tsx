import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

// Apple-style easing curve (ease-out)
const appleEase = [0.25, 0.1, 0.25, 1] as const

// Default animation timing (subtle)
const DEFAULT_DURATION = 0.5
const DEFAULT_STAGGER_DELAY = 0.08

// ============================================
// Animation Variants
// ============================================

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DEFAULT_DURATION, ease: appleEase },
  },
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DEFAULT_DURATION, ease: appleEase },
  },
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DEFAULT_DURATION, ease: appleEase },
  },
}

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DEFAULT_STAGGER_DELAY,
      delayChildren: 0.1,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DEFAULT_DURATION, ease: appleEase },
  },
}

// ============================================
// Animation Provider
// ============================================

interface AnimationProviderProps {
  children: ReactNode
}

/**
 * Wrap your app with this provider to enable animations.
 * Uses LazyMotion for smaller bundle size (~16KB).
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

// ============================================
// FadeIn Component
// ============================================

type FadeInProps<T extends ElementType = 'div'> = {
  children: ReactNode
  as?: T
  delay?: number
  className?: string
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn'
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>

/**
 * Fade in animation that triggers when element enters viewport.
 * Respects prefers-reduced-motion accessibility setting.
 */
export function FadeIn<T extends ElementType = 'div'>({
  children,
  as,
  delay = 0,
  className,
  variant = 'fadeUp',
  ...props
}: FadeInProps<T>) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    fadeUp: fadeUpVariants,
    fadeIn: fadeInVariants,
    scaleIn: scaleInVariants,
  }[variant]

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    const Component = as || 'div'
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    )
  }

  // Use m.create for custom elements (works with LazyMotion strict mode)
  const MotionComponent = as ? m.create(as) : m.div

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

// ============================================
// Stagger Container
// ============================================

type StaggerContainerProps<T extends ElementType = 'div'> = {
  children: ReactNode
  as?: T
  className?: string
  staggerDelay?: number
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>

/**
 * Container for staggered animations.
 * Children using StaggerItem will animate in sequence.
 */
export function StaggerContainer<T extends ElementType = 'div'>({
  children,
  as,
  className,
  staggerDelay = DEFAULT_STAGGER_DELAY,
  ...props
}: StaggerContainerProps<T>) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    const Component = as || 'div'
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    )
  }

  const MotionComponent = as ? m.create(as) : m.div

  const customVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={customVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

// ============================================
// Stagger Item
// ============================================

type StaggerItemProps<T extends ElementType = 'div'> = {
  children: ReactNode
  as?: T
  className?: string
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn'
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>

/**
 * Individual item within a StaggerContainer.
 * Animates in sequence with siblings.
 */
export function StaggerItem<T extends ElementType = 'div'>({
  children,
  as,
  className,
  variant = 'fadeUp',
  ...props
}: StaggerItemProps<T>) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    fadeUp: staggerItemVariants,
    fadeIn: fadeInVariants,
    scaleIn: scaleInVariants,
  }[variant]

  if (shouldReduceMotion) {
    const Component = as || 'div'
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    )
  }

  const MotionComponent = as ? m.create(as) : m.div

  return (
    <MotionComponent variants={variants} className={className} {...props}>
      {children}
    </MotionComponent>
  )
}

// ============================================
// Scale on Hover
// ============================================

interface ScaleOnHoverProps {
  children: ReactNode
  className?: string
  scale?: number
}

/**
 * Subtle scale animation on hover.
 * Uses GPU-accelerated transform for smooth 60fps.
 */
export function ScaleOnHover({
  children,
  className,
  scale = 1.02,
  ...props
}: ScaleOnHoverProps & Omit<ComponentPropsWithoutRef<'div'>, 'children'>) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <m.div
      whileHover={{ scale }}
      transition={{ duration: 0.2, ease: appleEase }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  )
}

// ============================================
// Exports
// ============================================

export { appleEase, DEFAULT_DURATION, DEFAULT_STAGGER_DELAY }
