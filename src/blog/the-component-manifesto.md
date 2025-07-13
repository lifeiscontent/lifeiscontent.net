---
title: 'The Component Manifesto'
date: '2025-07-13'
author: 'Aaron Reisman'
tags: ['components', 'architecture', 'react', 'best-practices']
---

Building components feels deceptively simple at first. You write a function, return some markup, and voilà you have a component. But as applications grow, the difference between components that scale gracefully and those that become maintenance nightmares lies in the principles that guide their creation.

After years of building and maintaining component-based applications, I've distilled a set of principles that transform component development from an art into a craft. These principles apply whether you're using React, Vue, Angular, or any component-based framework. This manifesto isn't about the latest libraries or cutting-edge patterns it's about timeless principles that make components a joy to work with.

I'll use React for the examples, but the concepts translate directly to any modern framework. Let's embark on a journey from simple components to sophisticated architectures, building our understanding step by step.

## Part 1: Foundation Principles

Before we dive into code, let's establish the core principles that guide everything else. These aren't just rules they're the philosophy that makes great components possible.

### Principle 1: Every Component Has One Job

Every component should have a clear, singular purpose. When you can't explain what a component does in one sentence, it's trying to do too much.

```typescript
// ✅ Clear purpose: "Displays a user's information"
export function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <article className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.role}</p>
      {onEdit ? <button onClick={() => onEdit(user.id)}>Edit</button> : null}
    </article>
  );
}

// ❌ Unclear purpose: Does too many things
export function UserComponent({ user, showEdit, editText, layout, ...props }) {
  // Component that tries to be a card, a list item, and a form all at once
}
```

### Principle 2: Public APIs Are Forever

How you export components shapes how others think about and use your code. Named exports force clarity:

```typescript
// ✅ Named exports enforce consistent naming
export function Button() { ... }
export function ButtonGroup() { ... }

// ❌ Default exports allow naming chaos
export default function Button() { ... }
// Now someone can import it as:
// import SubmitButton from './button'
// import Btn from './button'
// import CoolButton from './button'
// Same component, different names everywhere!
```

Export at the point of definition. Don't make readers hunt for what's public:

```typescript
// ✅ Immediately clear what's public
export type CardProps = {
  title: string;
  content: React.ReactNode;
};

export function Card({ title, content }: CardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <div>{content}</div>
    </article>
  );
}

// ❌ Export at bottom - makes readers scroll to find what's public
type CardProps = {
  title: string;
  content: React.ReactNode;
};

function Card({ title, content }: CardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <div>{content}</div>
    </article>
  );
}

// 200 lines later...
export { Card };
export type { CardProps };
```

### Principle 3: Complexity Should Grow Naturally

Start simple. Let complexity emerge naturally:

```typescript
// Stage 1: Single file
// components/button.tsx
export function Button({ variant, children }: ButtonProps) {
  return <button className={styles[variant]}>{children}</button>;
}
```

When internal complexity grows, evolve to a module:

```
// Stage 2: Module with internal components
components/button/
├── button.tsx          // Main component
├── button-icon.tsx     // Internal helper
└── index.ts           // Public API: export * from './button'
```

The beauty? Consumers never need to change their imports:

```typescript
// Always works, regardless of internal structure
import { Button } from '@/components/button';
```

## Part 2: The Language of Components

Now that we understand the principles, let's explore how to express them through naming and organization.

### Names Tell Stories

Component names should form a clear hierarchy that anyone can understand:

```typescript
// ✅ Clear parent-child relationships
export function Card() { ... }
export function CardHeader() { ... }
export function CardBody() { ... }
export function CardFooter() { ... }

// ❌ Ambiguous relationships
export function Card() { ... }
export function Header() { ... }  // Header of what?
export function Content() { ... } // Too generic
```

When working with domain entities, combine the resource with a UI pattern:

```typescript
// ✅ Resource + UI Component
export function UserCard() { ... }      // User + Card pattern
export function UserAvatar() { ... }    // User + Avatar pattern
export function ProductTable() { ... }  // Product + Table pattern
export function OrderList() { ... }     // Order + List pattern

// ❌ Domain-specific naming in UI components
export function UserProfile() { ... }   // "Profile" is domain knowledge
export function AccountSettings() { ... } // "Settings" is domain knowledge
```

The litmus test: Could you reuse this UI pattern with a different resource? If yes, it belongs in your design system. If not, you're building an application-specific component that should live with your feature code.

For example:

- `Card` → Design system (works for users, products, articles, etc.)
- `UserProfileCard` → Application-specific (combines generic Card with user domain logic)
- `Avatar` → Design system (works for users, teams, organizations, etc.)
- `UserAvatar` → Application-specific (knows about user data structure)

## Part 3: Designing Interfaces

With our naming sorted, let's design component interfaces that are both powerful and protective.

### Props Are Contracts, Not Configuration

Props are your component's public API. Design them thoughtfully:

```typescript
// ✅ Props that tell a story
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

// ❌ Props that expose implementation
type ButtonProps = {
  className?: string; // Forces consumers to know your CSS
  style?: React.CSSProperties; // Leaks styling decisions
  buttonRef?: React.Ref; // Implementation detail
};
```

Why is exposing implementation bad? Because UI is a function of state. Your components should hide the messy details of HTML, CSS, and JavaScript behind a purposeful API designed for your application's needs.

Libraries like Material UI or shadcn have to build low-level primitives with escape hatches because they're solving for thousands of different use cases. But you? You know exactly what your application needs. Design for that, and only that.

```typescript
// ❌ Generic component forcing implementation on consumers
<Button
  className="mt-4 bg-red-500 hover:bg-red-600 text-white"
  style={{ borderRadius: '8px' }}
  onClick={handleDelete}
>
  Delete
</Button>

// ✅ Purpose-built component that encapsulates behavior
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>
```

The second approach means:

- No wrestling with CSS classes in your application code
- No `useEffect` hooks to manage styling based on state
- Changes to the danger button style happen in one place
- Your application code focuses on business logic, not presentation

Here's why this matters. Imagine your designer updates the button specs: "All buttons need more breathing room - increase padding and adjust the font size."

With exposed className props, you're in for a world of pain:

```typescript
// ❌ With className exposed, you have hundreds of these scattered everywhere
<Button className="px-4 py-2 text-sm">Save</Button>
<Button className="px-3 py-1 text-xs">Cancel</Button>
<Button className="p-2 text-base">Submit</Button>
<Button className="px-6 py-3">Continue</Button>

// Some developer somewhere did this...
<Button className="px-4 py-2 mt-4 -ml-2 shadow-lg">Delete</Button>

// Another one got creative...
<Button className="p-4 text-sm font-bold uppercase">Confirm</Button>
```

Now you need to:

1. Search through the entire codebase for every Button usage
2. Figure out which custom padding was intentional vs accidental
3. Update hundreds of files
4. Test every single screen to catch visual regressions
5. Pray you didn't miss any

With a purpose-built API:

```typescript
// ✅ Design system change happens in ONE place
export function Button({ variant, size = 'medium', children }: ButtonProps) {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm', // Changed from px-3 py-1
    medium: 'px-6 py-3 text-base', // Changed from px-4 py-2
    large: 'px-8 py-4 text-lg', // Changed from px-6 py-3
  };
  // ...
}
```

One change. Every button in your app updates perfectly. No bugs. No hunting. No prayers needed.

### Principle 4: No Unnecessary Abstractions

Always destructure props in the function signature. Why? Because if you don't need the `props` object, why let it exist in the first place?

```typescript
// ❌ Creates unnecessary variable
export function Button(props: ButtonProps) {
  // Now 'props' exists in scope, tempting misuse
  return <button onClick={props.onClick}>{props.children}</button>;
}

// ❌ Even worse - mixed access patterns
export function Button(props: ButtonProps) {
  const { variant, size } = props;
  // Now you're accessing data two different ways!
  return <button className={getStyles(variant, size)}>{props.children}</button>;
}

// ✅ No props object to misuse
export function Button({ variant, spacing, ...props }: ButtonProps) {
  // Clean, direct access to what you need
  return <button className={getStyles(variant, spacing)} {...props} />;
}
```

Destructuring in the parameter accomplishes three things:

1. **Prevents inconsistent access patterns** - No mixing `props.foo` and `foo`
2. **Makes dependencies explicit** - You see exactly what the component uses
3. **Eliminates temptation** - No `props` object means no accidental prop spreading or passing the entire object around

It's the same principle as `const` vs `let` - if you don't need the flexibility, don't create it.

### The Type System: Your Safety Net

Use TypeScript's `type` alias, not `interface`, for component props. The key reason? Declaration merging can lead to surprising bugs:

```typescript
// ⚠️ Dangerous with interface - accidental merging
interface ButtonProps {
  variant: 'primary' | 'secondary';
}

// Later in the codebase (or in another file)...
interface ButtonProps {
  size: 'small' | 'medium' | 'large';
}

// Now ButtonProps requires BOTH variant AND size!
// Your component just broke everywhere it's used

// ✅ Type prevents this footgun
type ButtonProps = {
  variant: 'primary' | 'secondary';
};

// This would cause a clear error - no surprises!
type ButtonProps = {
  size: 'small' | 'medium' | 'large';
};
// Error: Duplicate identifier 'ButtonProps'
```

Declaration merging is a feature for library authors building extensible APIs. For component props, it's a bug waiting to happen. Stick with `type` for safety and clarity.

Never import prop types from other components. Use React's built-in utilities:

```typescript
// ✅ Deriving types safely
type ListProps = {
  items: Array<React.ComponentProps<typeof Card>>;
};

// ❌ Creating coupling
import type { CardProps } from './card';
type ListProps = {
  items: CardProps[];
};
```

Why does this coupling matter? Because components evolve:

```typescript
// Day 1: Simple Card component
export type CardProps = { title: string; content: string };
export function Card({ title, content }: CardProps) { ... }

// Day 30: Someone renames during refactoring
export type ProductCardProps = { title: string; content: string };  // Renamed!
export function ProductCard({ title, content }: ProductCardProps) { ... }

// 💥 Every file importing CardProps is now broken

// Day 60: Someone makes it generic
export type CardProps<T> = { title: string; data: T };  // Now generic!
export function Card<T>({ title, data }: CardProps<T>) { ... }

// 💥 Every file importing CardProps now has TypeScript errors
```

With `React.ComponentProps`, these changes are transparent:

```typescript
// ✅ Always works, no matter how Card evolves
type ListProps = {
  items: Array<React.ComponentProps<typeof Card>>;
};
```

The component can be renamed, made generic, or completely refactored. Your code doesn't know or care it just asks React "what props does this component accept?" and gets the right answer every time.

### Styling: Encapsulation Matters

Components should own their styling logic. Style should be a function of state and props:

```typescript
// ✅ Encapsulated styling
export function Alert({ severity, children }: AlertProps) {
  return (
    <div
      className={clsx('alert-base', {
        'alert-error': severity === 'error',
        'alert-warning': severity === 'warning',
        'alert-success': severity === 'success',
      })}
    >
      {children}
    </div>
  );
}

// ❌ Leaky styling
export function Alert({ className, children }: AlertProps) {
  return <div className={className}>{children}</div>;
  // Now consumers can override your styles, breaking the design system
  // when it evolves!
}
```

### File Organization: Predictable Patterns

Keep your file structure flat until complexity demands otherwise:

```typescript
// Simple component = simple structure
components/card.tsx

// Complex component = organized module
components/card/
├── index.ts           // Public exports
├── card.tsx          // Main component
├── card-header.tsx   // Internal component
├── card-body.tsx     // Internal component
└── utils.ts          // Internal utilities
```

Within modules, use simple names:

```typescript
// ✅ Clean internal structure
card/
├── utils.ts         // Not card-utils.ts
├── types.ts         // Not card-types.ts
└── constants.ts     // Not card-constants.ts
```

## Part 4: Advanced Patterns

Now for the fun part, patterns that elegantly solve complex problems while keeping your code maintainable.

### The Strategy Pattern: One Interface, Many Implementations

When displaying the same data in different ways, the strategy pattern keeps your code organized. Here's a real example with a pricing card that can be displayed in different styles:

The key is organizing your files to make internal sharing clear:

```
pricing-card/
├── index.ts                    // Public API (exports PricingCard only)
├── pricing-card-header.tsx     // Shared internal component
├── pricing-card-price.tsx      // Shared internal component
├── pricing-card-features.tsx   // Shared internal component
└── pricing-card/               // Strategy implementations
    ├── index.tsx              // Strategy selector with switch statement
    ├── default-pricing-card.tsx
    ├── featured-pricing-card.tsx
    └── compact-pricing-card.tsx
```

```typescript
// pricing-card/pricing-card/index.tsx - The strategy selector
export function PricingCard({ plan, variant = 'default' }: PricingCardProps) {
  switch (variant) {
    case 'featured':
      return <FeaturedPricingCard plan={plan} />;
    case 'compact':
      return <CompactPricingCard plan={plan} />;
    default:
      return <DefaultPricingCard plan={plan} />;
  }
}
```

The shared components are used across strategies:

```typescript
// pricing-card-header.tsx - Internal shared component
export function PricingCardHeader({
  title,
  description,
}: PricingCardHeaderProps) {
  return (
    <header>
      <h3>{title}</h3>
      <p>{description}</p>
    </header>
  );
}

// pricing-card/featured-pricing-card.tsx - Strategy implementation
import { PricingCardHeader } from '../pricing-card-header';
import { PricingCardPrice } from '../pricing-card-price';
import { PricingCardFeatures } from '../pricing-card-features';

export function FeaturedPricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className="border-2 border-blue-500 shadow-xl">
      <div className="bg-blue-500 text-white p-2 text-center">Most Popular</div>
      <PricingCardHeader title={plan.name} description={plan.description} />
      <PricingCardPrice price={plan.price} period={plan.period} featured />
      <PricingCardFeatures features={plan.features} />
    </div>
  );
}

// pricing-card/compact-pricing-card.tsx - Different layout, same components
export function CompactPricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className="flex items-center justify-between p-4 border">
      <PricingCardHeader title={plan.name} description={plan.description} />
      <PricingCardPrice price={plan.price} period={plan.period} compact />
    </div>
  );
}
```

This pattern shines when:

- Strategies share significant internal components
- You want consistent behavior with different presentations
- The variations truly are strategies, not completely different components

### The Art of Composition

Design components that compose naturally:

```typescript
// ✅ Composable UI components (design system)
<Card>
  <CardHeader>
    <Avatar user={user} />
    <Text variant="title">{user.name}</Text>
  </CardHeader>
  <CardBody>
    <Text>{user.bio}</Text>
  </CardBody>
  <CardFooter>
    <Button onClick={handleEdit}>Edit Profile</Button>
  </CardFooter>
</Card>

// ❌ Leaking configuration into props
<UserProfileCard
  user={user}
  showAvatar={true}
  showBio={true}
  showEditButton={true}
  editButtonText="Edit Profile"
  onEdit={handleEdit}
/>
```

But wait, monolithic components aren't always wrong! When building domain-specific components, being monolithic is often the right choice:

```typescript
// ✅ Domain-specific component configured by data
type UserProfile = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: 'admin' | 'user';
};

export function UserProfileCard({ userProfile, onEdit }: UserProfileCardProps) {
  // This component knows exactly how to display a user profile
  // It's not trying to be generic it solves one specific problem
  return (
    <Card>
      <CardHeader>
        <Avatar src={userProfile.avatar} />
        <Text variant="title">{userProfile.name}</Text>
        {userProfile.role === 'admin' && <Badge>Admin</Badge>}
      </CardHeader>
      <CardBody>
        <Text>{userProfile.bio}</Text>
      </CardBody>
      {onEdit && (
        <CardFooter>
          <Button onClick={() => onEdit(userProfile.id)}>Edit Profile</Button>
        </CardFooter>
      )}
    </Card>
  );
}
```

The key difference:

- **UI components** should be composable and flexible
- **Domain components** should be purposeful and data-driven

Don't create fake flexibility with boolean flags. Let data drive the behavior.

### Data Flow: The North Star

Let data guide your component design:

```typescript
// ✅ Component shaped by its data
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (productId: string) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Component clearly shows what data it needs
}

// ❌ Component with unclear data needs
type ProductCardProps = {
  name?: string;
  price?: number;
  image?: string;
  showPrice?: boolean;
  pricePrefix?: string;
  // What's required? What's optional? Why?
};
```

### Domain Separation: Keep UI Pure

UI components should be domain-agnostic:

```typescript
// ✅ Pure UI component (in ui package)
export function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
  // Generic table that works with any data
}

// ✅ Domain component (in feature folder)
export function UserTable({ users }: UserTableProps) {
  return (
    <Table data={users} columns={userColumns} onRowClick={handleUserClick} />
  );
}

// ❌ Domain logic in UI component
export function UserTable({ users }: UserTableProps) {
  // This belongs in the domain layer, not the UI package
  const sortedUsers = users.sort((a, b) => a.createdAt - b.createdAt);
  // ...
}
```

## Part 5: Bringing It All Together

Let's see how all these principles work together in practice. Imagine building a user management feature:

```typescript
// 1. Start with purpose-built, well-named components
export function UserCard({ user, onEdit }: UserCardProps) { ... }
export function UserAvatar({ user }: UserAvatarProps) { ... }
export function UserList({ users, onSelectUser }: UserListProps) { ... }

// 2. Organize them as they grow
user-management/
├── index.ts              // Public API exports only UserManagement
├── user-management.tsx   // Main component
├── user-card.tsx        // Internal component
├── user-avatar.tsx      // Internal component
└── types.ts             // Internal types

// 3. Design APIs that hide complexity
type UserManagementProps = {
  users: User[];
  onUpdateUser: (user: User) => void;
  variant?: 'compact' | 'detailed';
};

// 4. Let data drive behavior, not boolean flags
export function UserManagement({ users, onUpdateUser, variant = 'detailed' }: UserManagementProps) {
  // Component adapts based on data and purposeful props
  // No className, no style, no showThis/showThat flags
}
```

## The Journey Forward

We've traveled from simple principles to sophisticated patterns. Let's recap the journey:

**Foundation**: Components should have one job, expose clear APIs, and grow complexity only when needed.

**Language**: Names create hierarchies. Parent-child relationships should be obvious. Domain components combine resources with UI patterns.

**Interfaces**: Props are contracts, not escape hatches. Hide implementation details. Let TypeScript work for you, not against you.

**Patterns**: Use strategies for data variations. Compose for flexibility. Keep UI pure and domain components specific.

**Architecture**: Organize files to support your patterns. Internal components stay internal. Public APIs stay minimal.

## The Transformation

When you apply these principles, something profound happens:

```typescript
// Before: A mess of concerns
<UserCard
  className="mt-4 px-6"
  showAvatar={true}
  showBio={false}
  avatarSize="large"
  bioMaxLength={100}
  onEditClick={handleEdit}
  editButtonText="Edit Profile"
/>

// After: Clear, purposeful, maintainable
<UserCard
  user={user}
  onEdit={handleEdit}
  variant="compact"
/>
```

The difference isn't just aesthetic it's architectural. The second component:

- Can evolve without breaking consumers
- Hides complexity behind a simple interface
- Makes the right choice based on data, not configuration
- Can be understood at a glance

## Your Next Steps

1. **Start Today**: Pick one component that's been bothering you. Apply these principles. Feel the difference.

2. **Share the Knowledge**: These principles work best when your whole team embraces them. Share this manifesto. Start discussions.

3. **Evolve Your Style**: These aren't rigid rules they're a starting point. Adapt them to your needs. Find what works for your team.

4. **Build Your Legacy**: Every component you write is part of your legacy. Make it one that future developers (including yourself) will appreciate.

## The Manifesto

I believe:

- **Components should do one thing well**
- **APIs should reveal intent, not implementation**
- **Complexity should be earned, not assumed**
- **Data should drive behavior, not booleans**
- **Names should tell stories, not puzzles**
- **Patterns should solve problems, not create them**

This is my manifesto. This is how I build components that last.

_Join me. Build components that make you proud. Your code is your craft, make it exceptional._
