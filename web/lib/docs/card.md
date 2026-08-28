### Card
A content container component supporting headers, bodies, footers, interactive states (hoverable, pressable), custom radii, variants, and clean neutral theme backgrounds.

**Import Path**:
```typescript
import { Card } from "@/components/ui/card/card";
```

#### Default
Standard card layout composed of CardHeader, CardTitle, CardDescription, CardBody, and CardFooter.

```tsx
<Card className="w-full sm:w-96">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardBody>
    <p>
      Your subscription is set to renew automatically on August 15, 2026.
    </p>
  </CardBody>
  <CardFooter className="flex justify-between gap-3">
    <Button variant="flat" color="default">Dismiss</Button>
    <Button color="primary">View all</Button>
  </CardFooter>
</Card>
```

#### Variants
Cards support default, bordered, flat, ghost, shadow, glassmorphism, and gradient visual variants.

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
  <Card variant="default">...</Card>
  <Card variant="bordered">...</Card>
  <Card variant="flat">...</Card>
  <Card variant="ghost">...</Card>
  <Card variant="shadow">...</Card>
  <Card variant="glassmorphism">...</Card>
</div>
```

#### Color Themes
Apply subtle status accent indicators to cards while preserving a clean, neutral white/zinc dark theme card background.

```tsx
<div className="space-y-4 w-full">
  <Card color="primary">
    <CardHeader>
      <CardTitle>System Information</CardTitle>
      <CardDescription>Neutral background with primary accent indicator</CardDescription>
    </CardHeader>
  </Card>

  <Card color="success">
    <CardHeader>
      <CardTitle>Deployment Successful</CardTitle>
    </CardHeader>
  </Card>

  <Card color="danger">
    <CardHeader>
      <CardTitle>Connection Error</CardTitle>
    </CardHeader>
  </Card>
</div>
```

#### Interactive Cards & Ripple Effect
Use 'isHoverable' for subtle hover translations and 'isPressable' to enable click press feedback with an animated water ripple effect. Ripple can be disabled using 'disableRipple'.

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
  <Card isHoverable>
    <CardHeader>
      <CardTitle>Hoverable Card</CardTitle>
    </CardHeader>
  </Card>

  <Card isPressable isHoverable disableRipple={false}>
    <CardHeader>
      <CardTitle>Pressable with Ripple</CardTitle>
    </CardHeader>
  </Card>
</div>
```

#### Loading State
Pass 'isLoading' to render a clean backdrop overlay and animated spinner during data fetching.

```tsx
<Card isLoading>
  <CardHeader>
    <CardTitle>Fetching Analytics</CardTitle>
  </CardHeader>
</Card>
```

#### Background Icon Watermark
Pass 'backgroundIcon' to display a watermark icon aligned at the bottom-right corner of the card container.

```tsx
<Card backgroundIcon="hugeicons:source-code" isHoverable>
  <CardHeader>
    <CardTitle>Complete Ownership</CardTitle>
    <CardDescription>
      Copy full source code directly into your repository.
    </CardDescription>
  </CardHeader>
</Card>
```

#### Props — Card
Properties to configure the Card component.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | 'default' | 'bordered' | 'flat' | 'ghost' | 'shadow' | 'glassmorphism' | 'gradient' | 'default' | Visual variant style of the card. |
| color | 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'default' | Semantic color theme of the card accent indicator. |
| backgroundIcon | string | undefined | Iconify icon string to render as a background watermark overlay in the bottom-right corner. |
| radius | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'xl' | Border radius scale. |
| isHoverable | boolean | false | Enables subtle hover translation and shadow enhancement. |
| isPressable | boolean | false | Enables active press animations, ripple feedback, and interactive button role accessibility. |
| disableRipple | boolean | false | Disables click water ripple effect on pressable cards. |
| isLoading | boolean | false | Displays an overlay spinner state during data loading. |
| isDisabled | boolean | false | Disables interaction and applies muted opacity styling. |

