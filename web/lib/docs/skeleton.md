### Skeleton
Renders subtle animated pulse loading placeholders while data or media content is fetching.

**Import Path**:
```typescript
import { Skeleton } from "@/components/ui/skeleton/skeleton";
```

#### Default
Standard skeleton card loading placeholder.

```tsx
<div className="flex items-center gap-4 p-4 border rounded-2xl">
  <Skeleton variant="circle" className="size-12" />
  <div className="space-y-2 flex-1">
    <Skeleton variant="text" className="w-3/4 h-4" />
    <Skeleton variant="text" className="w-1/2 h-3" />
  </div>
</div>
```

#### Media Card Placeholder
Complex UI card skeleton preview structure.

```tsx
<div className="p-4 border rounded-2xl space-y-3">
  <Skeleton variant="rectangle" className="w-full h-36 rounded-xl" />
  <Skeleton variant="text" className="w-4/5 h-4" />
  <Skeleton variant="text" className="w-full h-3" />
</div>
```

#### Animation Switcher (Pulse vs Shimmer)
```tsx
<Skeleton animation="pulse" variant="rectangle" className="w-full h-24" />
<Skeleton animation="shimmer" variant="rectangle" className="w-full h-24" />
```

#### Props — Skeleton
Supported properties for Skeleton.

| Prop | Type | Default | Description |
|---|---|---|---|
| animation | 'pulse' | 'shimmer' | 'none' | 'pulse' | Animation effect switcher (pulse fade or shimmer gradient wave). |
| variant | 'circle' | 'rectangle' | 'text' | 'rectangle' | Shape layout of the loading placeholder. |
| isLoaded | boolean | false | When true, replaces skeleton with real children. |

