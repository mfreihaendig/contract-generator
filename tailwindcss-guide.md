# TailwindCSS Styling Guide

## Core Design Principles

Our styling approach emphasizes:
- Clean, minimal aesthetics with careful use of neutral colors that align with our goal of becoming Europe's Nr. 1 Notion Consultancy
- Apple-inspired design philosophy focusing on sophistication and simplicity
- Consistent spacing and typography across all components and tools
- Smooth transitions and subtle interactions that enhance user experience
- Accessibility and readability as core requirements
- Responsive design patterns that work across all device sizes

## Color System

### Color Tokens
```css
/* Primary Brand Colors */
--color-primary-900: #1A1A1A;
--color-primary-800: #424242;
--color-primary-700: #616161;

/* Neutral System */
--color-neutral-50: #F7F8F9;
--color-neutral-100: #E5E7EB;
--color-neutral-200: #D1D5DB;
--color-neutral-500: #6B7280;
--color-neutral-600: #4B5563;
--color-neutral-900: #111827;

/* Semantic Colors */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

### Color Application
```css
/* Backgrounds */
bg-white          /* Content backgrounds */
bg-neutral-50     /* Page backgrounds */
bg-neutral-100    /* Interactive elements */
bg-primary-900    /* Primary actions */

/* Text */
text-neutral-900  /* Primary text */
text-neutral-600  /* Secondary text */
text-neutral-500  /* Disabled text */
text-white        /* Inverse text */

/* Borders */
border-neutral-100  /* Subtle borders */
border-neutral-200  /* Interactive borders */
border-primary-900  /* Emphasis borders */

/* States */
text-success       /* Success messages */
text-warning       /* Warning messages */
text-error         /* Error states */
text-info          /* Information */
```

### Gradients
```css
/* Text Gradients */
bg-gradient-to-br from-[#1A1A1A] via-[#424242] to-[#1A1A1A]  /* Primary text gradient */

/* Background Gradients */
bg-[radial-gradient(circle_at_0%_0%,rgba(247,248,249,1)_0%,rgba(255,255,255,1)_100%)]  /* Subtle background */
bg-gradient-to-b from-white to-neutral-50  /* Card gradient */

/* Decorative Gradients */
bg-gradient-to-r from-transparent via-neutral-300 to-transparent  /* Separator lines */
```

## Typography

### Font Family
```css
font-sans  /* Base font - Inter */
```

### Text Sizes
```css
/* Headings */
text-5xl sm:text-6xl lg:text-[5.5rem]  /* Hero headlines */
text-4xl                                /* Section headlines */
text-2xl                                /* Card headlines */
text-xl                                 /* Subsection headlines */

/* Body Text */
text-lg      /* Enhanced body text */
text-base    /* Default body text */
text-sm      /* Supporting text */
```

### Font Weights
```css
font-bold      /* Primary headlines */
font-semibold  /* Secondary headlines */
font-medium    /* Enhanced body text */
font-normal    /* Regular body text */
```

## Layout Components

### Container Patterns
```css
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  /* Standard container */
max-w-5xl mx-auto                        /* Narrow container */
max-w-2xl mx-auto                        /* Very narrow container */
```

### Spacing
```css
/* Vertical Spacing */
py-32  /* Large section spacing */
py-12  /* Standard section spacing */
py-8   /* Component spacing */
py-4   /* Element spacing */

/* Margins */
mb-8   /* Standard bottom margin */
mt-4   /* Standard top margin */
```

### Z-Index Hierarchy
```css
z-50     /* Navigation */
z-10     /* Tooltips and popovers */
-z-10    /* Decorative elements */
```

## Visual Effects

### Shadows
```css
/* Component Shadows */
shadow-sm                /* Subtle depth */
shadow-lg                /* Enhanced depth */
shadow-[0_8px_32px_-12px_rgba(0,0,0,0.02)]  /* Custom subtle shadow */

/* Interactive States */
hover:shadow-xl          /* Hover enhancement */
```

### Backdrop Effects
```css
backdrop-blur-md        /* Navigation blur */
backdrop-blur-sm        /* Modal backdrop */
bg-white/80            /* Semi-transparent backgrounds */
```

## Component Patterns

### Base Patterns
Each component should follow these base patterns:

1. **Spacing**
```css
/* Internal Spacing */
p-4 sm:p-6        /* Default padding */
gap-4 sm:gap-6    /* Flex/grid gaps */

/* External Spacing */
mb-4 sm:mb-6      /* Default margins */
```

2. **Structure**
```css
/* Container */
relative          /* Positioning context */
overflow-hidden   /* Content containment */
rounded-lg        /* Consistent corners */

/* Interactive */
cursor-pointer    /* Click targets */
select-none      /* Prevent selection */
```

3. **States**
```css
/* Focus */
focus:ring-2
focus:ring-primary-900
focus:ring-offset-2

/* Hover */
hover:bg-neutral-50
hover:scale-[1.02]

/* Active */
active:scale-[0.98]
```

### Common Components

#### Buttons

##### Primary Button
```css
inline-flex items-center justify-center px-10 py-5 
bg-neutral-900 text-white rounded-full 
hover:bg-neutral-800 transition-all duration-300 
text-lg font-medium transform 
hover:scale-[1.02] hover:shadow-lg
```

##### Secondary Button
```css
inline-flex items-center text-neutral-900 
font-medium group/link
```

#### Cards
```css
bg-white p-8 rounded-2xl border border-neutral-100 
hover:shadow-xl transition-all duration-500 
relative overflow-hidden flex flex-col
```

#### Navigation
```css
fixed w-full bg-white/80 backdrop-blur-md z-50 
border-b border-neutral-100
```

#### Input Fields
```css
/* Base */
w-full px-4 py-2 
bg-white border border-neutral-200 
rounded-lg text-neutral-900

/* States */
hover:border-neutral-300
focus:border-primary-900 
focus:ring-2 focus:ring-primary-900/20

/* Validation */
[data-valid=true]:border-success
[data-valid=false]:border-error
```

## Interactive Patterns

### Group Interactions
```css
group                  /* Parent element */
group-hover:          /* Child hover effects */
group/link            /* Isolated group naming */
peer                  /* Alternative to group for specific cases */
```

### Transitions & Animations
```css
/* Standard Transitions */
transition-colors duration-200    /* Color changes */
transition-all duration-300      /* Multiple properties */
transition-transform duration-300 /* Movement */

/* Hover Effects */
hover:scale-[1.02]              /* Subtle scaling */
hover:shadow-lg                 /* Shadow enhancement */
group-hover:translate-x-1      /* Group-based movement */
```

### Custom Properties
```css
@property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}
```

## Accessibility

### Focus States
```css
focus:border-neutral-900 
focus:ring-neutral-900
focus:ring-2          /* Focus ring width */
focus:ring-offset-2   /* Focus ring offset */
focus:outline-none    /* Remove default outline */
```

### ARIA Support
```css
/* Interactive Elements */
aria-label="..."      /* Always include for interactive elements */
aria-expanded="..."   /* For expandable components */
aria-hidden="true"    /* For decorative elements */
```

## Responsive Design

### Breakpoints
```css
sm:  /* >= 640px */
md:  /* >= 768px */
lg:  /* >= 1024px */
xl:  /* >= 1280px */
```

### Common Responsive Patterns
```css
/* Text Scaling */
text-5xl sm:text-6xl lg:text-[5.5rem]

/* Layout Adjustments */
flex-col sm:flex-row
grid md:grid-cols-2 lg:grid-cols-3
```

## Tools & Utilities

### Development Tools
1. **Style Linting**
- Use Prettier with consistent configuration
- Implement StyleLint for CSS/Tailwind
- Maintain sorting order for classes

2. **Class Organization**
```css
/* Recommended order */
.component {
    /* Layout */
    @apply relative flex;
    
    /* Spacing */
    @apply p-4 mb-4;
    
    /* Visual */
    @apply bg-white rounded-lg;
    
    /* Interactive */
    @apply hover:bg-neutral-50;
    
    /* Typography */
    @apply text-lg text-neutral-900;
}
```

3. **Performance Considerations**
- Use `@apply` for frequently repeated patterns
- Implement purging for production builds
- Monitor bundle size impact

## Quality Assurance

### Checklist
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Components are keyboard accessible
- [ ] Hover states are consistent
- [ ] Spacing follows established patterns
- [ ] Responsive behavior is smooth
- [ ] Focus states are visible
- [ ] Animations respect reduced-motion preferences

## Tool Integration Guidelines

When creating new tools:
1. Use the same neutral color palette for consistency across all applications
2. Maintain consistent spacing patterns as defined in this guide
3. Reuse existing component patterns where possible to ensure visual cohesion
4. Follow the established responsive breakpoint system
5. Extend thoughtfully for tool-specific needs while maintaining visual consistency

### Tool-Specific Components

Some tools may require specific components. For example, the ROI Calculator includes:
- Interactive form elements with consistent styling
- Range sliders with custom styling
- Tooltips with responsive behavior
- Progress bars and data visualization
- Modal overlays and backdrops

When adding such components, ensure they follow the core design principles while meeting the specific tool's needs.

## References

The main styling patterns can be found in `index.html`, which serves as the source of truth for the project's design system. Additional component styles are located in the tools directory, with each tool maintaining consistent styling while potentially introducing tool-specific components.

When adding new tools or components, always refer to the main `index.html` for base styling patterns and extend thoughtfully for specific needs while maintaining visual consistency.