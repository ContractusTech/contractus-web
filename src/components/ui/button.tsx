import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[14px] text-md font-medium tracking-tight ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-[#AD4C4C] text-destructive-foreground hover:bg-destructive/90 text-[#000]',

        [`destructive-2`]:
          'bg-[#28282F] text-destructive-foreground hover:opacity-[0.7] opacity-1 transition text-[#AD4C4C]',

        outline:
          'border border-[#18181E] bg-secondary hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',

        link: 'text-primary underline-offset-4 hover:underline',

        tertiary: 'bg-[#28282F] hover:opacity-[0.8]',

        quaternary:
          'bg-[#070708] border border-[#2A2C34] hover:opacity-[0.8] text-[#fff]'
      },
      size: {
        default: 'h-42 px-20 py-10',
        sm: 'h-28 rounded-[12px] px-15',
        lg: 'h-42 rounded-[12px] px-32',
        icon: 'p-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
