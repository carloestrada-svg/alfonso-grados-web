---
description: Code style guidelines for the project TS, TSX, Tailwind, Next.js App Router, shadcn/ui
globs: "*.ts,*.tsx"
---

# Code Style Guidelines

## Stack

- Framework: Next.js (App Router)
- Language: TypeScript (TSX)
- Styling: Tailwind CSS only
- Component Library: shadcn/ui

---

## TypeScript Rules

- Use `const` over `let`, never use `var`
- No unused variables or imports
- Use optional chaining `?.` instead of manual null checks
- Prefer early returns over deeply nested if/else
- Always type function parameters and return values
- Use `interface` for object shapes, `type` for unions and aliases
- Never use `any`, prefer `unknown` if the type is truly uncertain

```ts
const name = user?.profile?.name ?? 'Guest'

async function getUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  return res.json() as User
}
```

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserCard`, `AuthModal` |
| Component files | kebab-case | `user-card.tsx` |
| Utility files | kebab-case | `format-date.ts` |
| Hook files | kebab-case | `use-auth.ts` |
| Folders | kebab-case | `user-profile/` |
| Functions | camelCase | `getUserData()` |
| Variables | camelCase | `isLoading`, `hasError` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Interfaces | PascalCase | `UserProps`, `ApiResponse` |
| Types | PascalCase | `Status`, `Theme` |

---

## File & Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── [feature]/
│       ├── page.tsx
│       ├── loading.tsx
│       └── error.tsx
├── components/
│   ├── ui/               # shadcn/ui base components — do not edit
│   └── [feature]/
│       └── feature-card.tsx
├── lib/
├── hooks/
├── types/
└── constants/
```

---

## Components

Use `interface` for props. Set default values in function parameters. Always default export at the bottom of the file.

```tsx
// components/feature/feature-card.tsx

import { FC } from 'react'

import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description?: string
  className?: string
}

const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description = '',
  className,
}) => {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export default FeatureCard
```

---

## 'use client' Directive

Only add `'use client'` when the component uses `useState`, `useEffect`, event handlers, or browser APIs. Everything else stays as a Server Component.

```tsx
'use client'

import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}

export default Counter
```

---

## Styling

Use `cn()` for conditional class merging.

```tsx
import { cn } from '@/lib/utils'

const Button = ({ isActive }: { isActive: boolean }) => (
  <button
    className={cn(
      'px-4 py-2 rounded-md font-medium',
      isActive ? 'bg-primary text-white' : 'bg-muted text-foreground'
    )}
  >
    Click me
  </button>
)
```

---

## Import Order

Always follow this order with a blank line between each group.

```tsx
// 1. React / Next.js
import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 2. External libraries
import { format } from 'date-fns'

// 3. shadcn/ui components
import { Button } from '@/components/ui/button'

// 4. Internal components
import FeatureCard from '@/components/feature/feature-card'

// 5. Hooks, utils, constants, types
import { useAuth } from '@/hooks/use-auth'
import { formatDate } from '@/lib/format-date'
import { MAX_RETRY_COUNT } from '@/constants'
import type { User } from '@/types'
```

---

## Next.js

Always use Next.js `<Image />` instead of `<img>` and `<Link />` instead of `<a>` for internal navigation.

```tsx
import Image from 'next/image'
import Link from 'next/link'

<Image src="/logo.png" alt="Logo" width={100} height={40} />
<Link href="/dashboard">Dashboard</Link>
```

Server Components support async/await directly — no extra setup needed.

```tsx
// app/users/page.tsx

import { getUsers } from '@/lib/api'
import UserCard from '@/components/user/user-card'
import type { User } from '@/types'

const UsersPage = async () => {
  const users: User[] = await getUsers()

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  )
}

export default UsersPage
```

---

## Error Handling

Always wrap async calls in `try/catch`. Never swallow errors silently. Log errors with component context.

```ts
export async function getUser(id: string): Promise<User> {
  try {
    const res = await fetch(`/api/users/${id}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`)
    }

    return res.json() as Promise<User>
  } catch (error) {
    console.error('[getUser]:', error)
    throw error
  }
}
```

---

## Types

```ts
// types/index.ts

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  createdAt: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export type Status = 'idle' | 'loading' | 'success' | 'error'

export type Theme = 'light' | 'dark' | 'system'
```

---

## Custom Hook

```ts
// hooks/use-auth.ts

'use client'

import { useState, useEffect } from 'react'

import type { User } from '@/types'

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          setUser(null)
          return
        }
        const data = await res.json() as User
        setUser(data)
      } catch (error) {
        console.error('[useAuth]:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, isLoading, isAuthenticated: user !== null }
}

export default useAuth
```

---

## Utility Function

Write JSDoc for all exported utility functions.

```ts
// lib/format-date.ts

/**
 * Formats an ISO date string into a human-readable format.
 * @param dateString - ISO 8601 date string
 * @param locale - Optional locale (default: 'en-US')
 */
export const formatDate = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    console.error('[formatDate]: Invalid date string provided')
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
```

---

## Constants

```ts
// constants/index.ts

export const MAX_RETRY_COUNT = 3

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  PROFILE: '/profile',
} as const
```

---

## Comments

No obvious comments. Only comment complex business logic. Use JSDoc for exported utility functions.

```ts
// Retry with exponential backoff and jitter to avoid thundering herd
const delay = Math.min(1000 * 2 ** attempt + Math.random() * 100, 30000)
```

---

## General Rules

- Max line length: 100 characters
- Use double quotes `"` for JSX attributes
- Use single quotes `'` for JS/TS strings
- No semicolons — let Prettier handle it
- No `console.log` in production code — use `console.error` for errors only
- Always keep `strict: true` enabled in `tsconfig.json`

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```
