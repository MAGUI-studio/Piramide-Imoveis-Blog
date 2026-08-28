### Input
A flexible, accessible text input field supporting visual style variants, label placements, native formatting masks, copy shortcuts, debounced search, clearable buttons, and character counters.

**Import Path**:
```typescript
import { Input } from "@/components/ui/input/input";
```

#### Default
Standard input field with label and placeholder.

```tsx
<Input label="Email Address" placeholder="you@example.com" />
```

#### Variants
Choose between default, bordered, flat, filled, glow, glassmorphism, gradient-border, and underlined styles.

```tsx
<Input variant="default" label="Default" placeholder="Default style" />
<Input variant="bordered" label="Bordered" placeholder="Bordered style" />
<Input variant="flat" label="Flat" placeholder="Flat style" />
<Input variant="filled" label="Filled" placeholder="Filled style" />
<Input variant="glow" label="Glow" placeholder="Glow focus style" />
<Input variant="glassmorphism" label="Glassmorphism" placeholder="Glassmorphism style" />
<Input variant="gradient-border" label="Gradient Border" placeholder="Gradient border style" />
<Input variant="underlined" label="Underlined" placeholder="Underlined style" />
```

#### Label Placement
Position the label on top, left, inside (floating style), or outside.

```tsx
<Input label="Top Placement" labelPlacement="top" placeholder="Label placed on top" />
<Input label="Left Placement" labelPlacement="left" placeholder="Label placed on left" />
<Input label="Inside Placement" labelPlacement="inside" placeholder="Floating inside label" />
```

#### Prefix & Suffix
Embedded inline prefixes and suffixes for URLs, currency, domains, etc.

```tsx
<Input prefix="https://" suffix=".com" label="Website URL" placeholder="mycompany" />
<Input prefix="R$" label="Amount" placeholder="1.250,00" />
<Input suffix="@company.com" label="Corporate Email" placeholder="john" />
```

#### Native Formatting Masks
Built-in formatting masks for CPF, CNPJ, Phone, ZIP (CEP), Credit Card, or Custom patterns.

```tsx
<Input mask="CPF" label="CPF Mask" placeholder="000.000.000-00" />
<Input mask="CNPJ" label="CNPJ Mask" placeholder="00.000.000/0000-00" />
<Input mask="Phone" label="Phone Mask" placeholder="(11) 99999-9999" />
<Input mask="ZIP" label="ZIP (CEP) Mask" placeholder="00000-000" />
<Input mask="CreditCard" label="Credit Card Mask" placeholder="0000 0000 0000 0000" />
<Input mask="Custom" customMaskPattern="999-AAA" label="Custom Mask" placeholder="123-ABC" />
```

#### Clearable, Password Toggle & Copyable
Built-in triggers for 1-click clear (ESC shortcut), animated password eye toggle, and copy-to-clipboard with toast notification.

```tsx
<Input isClearable label="Clearable Field" defaultValue="Click X or press ESC" />
<Input isPasswordToggle label="Password Field" defaultValue="super-secret-password" />
<Input isCopyable label="Copyable Code" defaultValue="ZOE-UI-2026-TOKEN-XYZ" />
```

#### Character Counter & Debounced Search
Dynamic character counter with warning color near limit, and debounced callback support.

```tsx
<Input showCharacterCount maxLength={20} label="Bio" defaultValue="Hello world Bloom" />
<Input debouncedOnChange={(val) => console.log(val)} debounceTimeout={400} label="Debounced Search" />
```

#### Required State
Displays an asterisk next to the label indicating that input value is mandatory.

```tsx
<Input isRequired label="Primary Email" placeholder="you@domain.com" />
```

#### Props — Input
Properties to configure the Input component.

| Prop | Type | Default | Description |
|---|---|---|---|
| labelPlacement | 'top' | 'left' | 'inside' | 'outside' | 'top' | Label positioning mode. |
| variant | 'default' | 'bordered' | 'flat' | 'underlined' | 'filled' | 'glassmorphism' | 'gradient-border' | 'glow' | 'default' | Visual style variant. |
| isClearable | boolean | false | Clear button with 1-click action & ESC key shortcut. |
| isPasswordToggle | boolean | false | Animated password visibility toggle button. |
| prefix | ReactNode | — | Embedded text/element prefix inside the input. |
| suffix | ReactNode | — | Embedded text/element suffix inside the input. |
| mask | 'CPF' | 'CNPJ' | 'Phone' | 'ZIP' | 'CreditCard' | 'Custom' | Function | — | Native input formatting mask. |
| showCharacterCount | boolean | false | Displays live character counter with warning color states. |
| isCopyable | boolean | false | Quick button to copy content with automatic toast feedback. |
| debouncedOnChange | (value: string) =&gt; void | — | Callback function called after debounceTimeout. |

