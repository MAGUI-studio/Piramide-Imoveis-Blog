### Avatar
Avatars represent a user or entity using an image, initials fallback, editable photo uploads, or status indicator. Built on top of Radix UI primitive with support for interactive press states and standardized neutral dark/light themes.

**Import Path**:
```typescript
import { Avatar } from "@/components/ui/avatar/avatar";
```

#### Default
A standard avatar component displaying a user image with an automated initials fallback when the image is absent or loading.

```tsx
<div className="flex flex-wrap items-center gap-4">
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Sarah Jenkins" />
    <AvatarFallback>SJ</AvatarFallback>
  </Avatar>

  <Avatar>
    <AvatarImage src="invalid-url.jpg" alt="Broken link" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>

  <Avatar>
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
</div>
```

#### Sizes
Scales seamlessly from 'xs' (24px) to '3xl' (80px) across predefined design scale tokens.

```tsx
<div className="flex flex-wrap items-center gap-4">
  <Avatar size="xs"><AvatarFallback>XS</AvatarFallback></Avatar>
  <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
  <Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
  <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
  <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
  <Avatar size="2xl"><AvatarFallback>2X</AvatarFallback></Avatar>
  <Avatar size="3xl"><AvatarFallback>3X</AvatarFallback></Avatar>
</div>
```

#### Editable Photo Upload Overlay
Render a hover photo upload icon overlay using 'isEditable' and trigger 'onUpload' callback. Click the editable avatar to open the cropper modal flow.

```tsx
const [isCropOpen, setIsCropOpen] = useState(false);
const [cropResult, setCropResult] = useState(null);
const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);
const cropperRef = useRef(null);

const handlePhotoUploadSelected = (files) => {
  if (files && files[0]) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setUploadedPhotoUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleSaveCrop = () => {
  if (cropperRef.current) {
    const cropped = cropperRef.current.crop();
    if (cropped) {
      setCropResult(cropped);
      setUploadedPhotoUrl(null);
    }
  }
  setIsCropOpen(false);
  toast.success("Profile photo updated successfully!");
};

return (
  <div className="flex items-center gap-5">
    <Avatar size="xl" isEditable onUpload={() => setIsCropOpen(true)}>
      <AvatarImage src={cropResult ?? "/utils/image-cropper.webp"} alt="Sarah Jenkins" />
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>

    <Dialog open={isCropOpen} onOpenChange={(open) => {
      setIsCropOpen(open);
      if (!open) setUploadedPhotoUrl(null);
    }}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Edit Profile Photo</DialogTitle>
          <DialogDescription>Adjust scale, rotate, and crop your profile avatar.</DialogDescription>
        </DialogHeader>

        {!uploadedPhotoUrl ? (
          <FileUpload
            label="Select Profile Photo"
            accept="image/*"
            showPreviews={false}
            simulateProgress={false}
            onFilesSelected={handlePhotoUploadSelected}
          />
        ) : (
          <ImageCropper
            ref={cropperRef}
            src={uploadedPhotoUrl}
            circular
            showCropButton={false}
          />
        )}

        <DialogFooter>
          <DialogClose asChild><Button variant="flat">Cancel</Button></DialogClose>
          <Button color="primary" onClick={handleSaveCrop} disabled={!uploadedPhotoUrl}>Apply Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);
```

#### Pressable Avatars
Enable interactive press behavior using 'isPressable' for profile triggers, user menus, or clickable list avatars.

```tsx
<div className="flex flex-wrap items-center gap-5">
  <Avatar isPressable onClick={() => toast.info("Clicked Profile")}>
    <AvatarImage src="..." alt="Sarah Jenkins" />
    <AvatarFallback>SJ</AvatarFallback>
  </Avatar>

  <Avatar isPressable isBordered color="primary" onClick={() => toast.info("Clicked Profile")}>
    <AvatarImage src="..." alt="Alex Rivera" />
    <AvatarFallback>AR</AvatarFallback>
  </Avatar>

  <Avatar isPressable color="success" onClick={() => toast.info("Clicked Profile")}>
    <AvatarFallback>MK</AvatarFallback>
  </Avatar>
</div>
```

#### Colors & Bordered Rings
Pair 'isBordered' with any design system color to highlight user status, active stories, or primary roles. Fallbacks automatically adapt soft accent colors.

```tsx
<div className="flex flex-wrap items-center gap-4">
  <Avatar isBordered color="default"><AvatarFallback>DF</AvatarFallback></Avatar>
  <Avatar isBordered color="primary"><AvatarFallback>PR</AvatarFallback></Avatar>
  <Avatar isBordered color="secondary"><AvatarFallback>SC</AvatarFallback></Avatar>
  <Avatar isBordered color="accent"><AvatarFallback>AC</AvatarFallback></Avatar>
  <Avatar isBordered color="success"><AvatarFallback>SU</AvatarFallback></Avatar>
  <Avatar isBordered color="warning"><AvatarFallback>WR</AvatarFallback></Avatar>
  <Avatar isBordered color="danger"><AvatarFallback>DG</AvatarFallback></Avatar>
</div>
```

#### Status Indicators
Adds a status dot indicator (online, away, offline, dnd) positioned at any corner.

```tsx
<div className="flex flex-wrap items-center gap-6">
  <Avatar status="success" statusPosition="bottom-right"><AvatarFallback>ON</AvatarFallback></Avatar>
  <Avatar status="warning" statusPosition="top-right"><AvatarFallback>AW</AvatarFallback></Avatar>
  <Avatar status="danger" statusPosition="bottom-left"><AvatarFallback>OFF</AvatarFallback></Avatar>
  <Avatar status="secondary" statusPosition="top-left"><AvatarFallback>DND</AvatarFallback></Avatar>
</div>
```

#### User Info Layout
Display custom headers, name, email, or role labels (title and description metadata) aligned alongside the Avatar component using title and description props.

```tsx
<Avatar
  title="Sarah Jenkins"
  description="sarah.j@example.com"
>
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Sarah Jenkins" />
  <AvatarFallback>SJ</AvatarFallback>
</Avatar>

<Avatar
  color="success"
  isBordered
  title="Alex Rivera"
  description={<span className="text-emerald-600 dark:text-emerald-400 font-medium">System Admin</span>}
>
  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Alex Rivera" />
  <AvatarFallback>AR</AvatarFallback>
</Avatar>
```

#### Avatar with Dropdown Menu
Nest an interactive pressable Avatar within a DropdownMenu trigger to represent typical account or authentication menu systems.

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdownMenu/dropdownMenu";

return (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar isPressable>
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Sarah Jenkins" />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="start">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 leading-none">Sarah Jenkins</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-none">sarah.j@example.com</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => console.log("Profile")}>Profile</DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Settings")}>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-rose-600" onClick={() => console.log("Log out")}>Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
```

#### Props — Avatar
Properties for configuring the Avatar root component.

| Prop | Type | Default | Description |
|---|---|---|---|
| isEditable | boolean | false | Renders a photo camera icon overlay on hover for image updates. |
| onUpload | () =&gt; void | — | Callback triggered when clicking the upload overlay icon. |
| size | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'md' | Sets the dimension scale of the avatar. |
| color | 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'default' | Theme color for the outer ring when isBordered is true, and for the fallback background. |

