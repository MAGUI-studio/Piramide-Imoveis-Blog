### Badge
A compact label used to highlight status, categories, or contextual metadata. Supports multiple color palettes, visual variants, sizes, pressable interactions, and optional dot indicators or icon slots.

**Import Path**:
```typescript
import { Badge } from "@/components/ui/badge/badge";
```

#### Default
A standard badge component displaying a neutral status label.

```tsx
<Badge>Default Badge</Badge>
```

#### Variants
Controls the visual appearance of the badge. 'flat' is the default and works well for most contexts.

```tsx
<div className="flex flex-wrap gap-3">
  <Badge variant="default" color="primary">Default</Badge>
  <Badge variant="bordered" color="primary">Bordered</Badge>
  <Badge variant="flat" color="primary">Flat</Badge>
  <Badge variant="ghost" color="primary">Ghost</Badge>
  <Badge variant="shadow" color="primary">Shadow</Badge>
  <Badge variant="dot" color="primary">Dot</Badge>
</div>
```

#### Colors
Semantic color scale for the badge. Each color is shown across all six visual variants for clear comparison.

```tsx
<div className="space-y-4">
  <Badge color="primary" variant="flat">Flat</Badge>
  <Badge color="primary" variant="bordered">Bordered</Badge>
  <Badge color="primary" variant="default">Solid</Badge>
  <Badge color="primary" variant="ghost">Ghost</Badge>
  <Badge color="primary" variant="shadow">Shadow</Badge>
  <Badge color="primary" variant="dot">Dot</Badge>
</div>
```

#### Sizes
Three size options to adapt to different UI contexts.

```tsx
<div className="flex flex-wrap items-center gap-3">
  <Badge size="sm" color="primary">Small</Badge>
  <Badge size="md" color="primary">Medium</Badge>
  <Badge size="lg" color="primary">Large</Badge>
</div>
```

#### Radius
Control the border radius. Defaults to 'full' for a pill shape.

```tsx
<div className="flex flex-wrap items-center gap-3">
  <Badge radius="none" color="primary">None</Badge>
  <Badge radius="sm" color="primary">Small</Badge>
  <Badge radius="md" color="primary">Medium</Badge>
  <Badge radius="lg" color="primary">Large</Badge>
  <Badge radius="xl" color="primary">XL</Badge>
  <Badge radius="full" color="primary">Full</Badge>
</div>
```

#### Pressable
Add 'isPressable' to make badges interactive with scale micro-animations and active press feedback.

```tsx
<Badge isPressable color="primary" onClick={() => toast.success("Clicked")}>
  Clickable Primary
</Badge>
```

#### Dot indicator
Adds a small colored dot before the label — useful for status or presence indicators.

```tsx
<div className="flex flex-wrap gap-3">
  <Badge dot color="success">Online</Badge>
  <Badge dot color="warning">Away</Badge>
  <Badge dot color="danger">Offline</Badge>
  <Badge dot color="default">Unknown</Badge>
</div>
```

#### Icon slots
Use 'startContent' or 'endContent' to place icons or any ReactNode inside the badge.

```tsx
<div className="flex flex-wrap gap-3">
  <Badge
    color="success"
    startContent={<Icon icon="hugeicons:checkmark-circle-02" className="size-3.5" />}
  >
    Verified
  </Badge>
  <Badge
    color="warning"
    startContent={<Icon icon="hugeicons:alert-02" className="size-3.5" />}
  >
    Warning
  </Badge>
  <Badge
    color="primary"
    endContent={<Icon icon="hugeicons:arrow-right-01" className="size-3.5" />}
  >
    New
  </Badge>
  <Badge
    color="danger"
    startContent={<Icon icon="hugeicons:cancel-circle" className="size-3.5" />}
  >
    Error
  </Badge>
</div>
```

#### Live Pulsing Status
Use 'isPulsing' to render a live animated pulse ring effect for real-time status indicators (e.g. 'LIVE', 'Recording').

```tsx
<Badge color="danger" isPulsing dot>LIVE</Badge>
<Badge color="success" isPulsing dot>Recording System</Badge>
<Badge color="warning" isPulsing dot>Processing Stream</Badge>
<Badge color="success" isDot isPulsing />
```

#### Removable Tags
Render a dismiss close button inside the badge using 'isRemovable' and 'onRemove'.

```tsx
<Badge color="primary" isRemovable onRemove={() => handleRemove()}>
  React
</Badge>
```

#### Props — Badge
Properties to configure the Badge component.

| Prop | Type | Default | Description |
|---|---|---|---|
| color | 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'default' | Sets the color theme of the badge. |
| variant | 'default' | 'bordered' | 'flat' | 'ghost' | 'shadow' | 'dot' | 'flat' | Sets the visual variant style. |
| size | 'sm' | 'md' | 'lg' | 'md' | Sets the size scale of the badge. |
| radius | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'full' | Sets border-radius of the badge. |
| isPressable | boolean | false | Enables interactive hover scale and click feedback. |
| isDisabled | boolean | false | Disables interaction and applies opacity filter. |
| isInvisible | boolean | false | Hides the badge when true. |
| dot | boolean | false | Displays a small colored status dot before the content. |
| startContent | ReactNode | — | Element rendered before the badge label (e.g. an icon). |
| endContent | ReactNode | — | Element rendered after the badge label. |
| live | boolean | false | Enables aria-live="polite" region for dynamic status/count updates. |

