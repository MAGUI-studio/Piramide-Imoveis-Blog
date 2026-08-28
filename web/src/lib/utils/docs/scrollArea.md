### ScrollArea
Augments native scroll functionality with custom cross-browser styled scrollbars built on Radix UI primitives.

**Import Path**:
```typescript
import { ScrollArea } from "@/src/components/ui/scrollArea/scrollArea";
```

#### Default
Vertical scrollable list container.

```tsx
<ScrollArea className="h-60 w-72 border rounded-2xl p-4">
  {items.map(item => (
    <div key={item.id}>{item.title}</div>
  ))}
</ScrollArea>
```

#### Horizontal Scrolling
Horizontal scroll container using orientation='horizontal'.

```tsx
<ScrollArea orientation="horizontal" className="w-full max-w-lg border rounded-2xl p-4">
  <div className="flex gap-3">
    {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
  </div>
</ScrollArea>
```

#### Floating Action Scroll Buttons
Enable floating scroll-to-top and scroll-to-bottom action buttons on hover with 'showScrollButtons'.

```tsx
<ScrollArea showScrollButtons className="h-60 w-80 border rounded-2xl p-4">
  {content}
</ScrollArea>
```

#### Scroll Progress Bar
Display a top progress indicator bar showing current scroll percentage with 'showProgressBar'.

```tsx
<ScrollArea showProgressBar className="h-60 w-80 border rounded-2xl p-4">
  {content}
</ScrollArea>
```

#### Props — ScrollArea
Supported properties for ScrollArea.

| Prop | Type | Default | Description |
|---|---|---|---|
| showScrollButtons | boolean | false | Displays floating scroll-to-top / scroll-to-bottom action buttons on hover. |
| showProgressBar | boolean | false | Displays top scroll progress indicator line. |
| orientation | 'vertical' | 'horizontal' | 'both' | 'vertical' | Scroll direction layout and scrollbar visibility. |

