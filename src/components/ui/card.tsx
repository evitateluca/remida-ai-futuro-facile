
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: boolean;
    glowing?: boolean;
    achievement?: boolean;
  }
>(({ className, gradient, glowing, achievement, ...props }, ref) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm";
  
  let cardClasses = baseClasses;
  
  if (gradient) {
    cardClasses = cn(baseClasses, "bg-gradient-to-br from-remida-teal/5 to-remida-orange/5 border-remida-teal/20");
  }
  
  if (glowing) {
    cardClasses = cn(baseClasses, "relative overflow-hidden");
    return (
      <div
        ref={ref}
        className={cn(cardClasses, className)}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-remida-teal/20 via-remida-orange/5 to-remida-teal/20 opacity-30 animate-pulse" />
        <div className="relative z-10 h-full">
          {props.children}
        </div>
      </div>
    )
  }
  
  if (achievement) {
    cardClasses = cn(baseClasses, "border-2 border-remida-orange/50 hover:border-remida-orange transition-all duration-300");
  }
  
  return (
    <div
      ref={ref}
      className={cn(cardClasses, className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
