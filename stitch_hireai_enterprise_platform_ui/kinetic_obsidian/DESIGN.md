---
name: Kinetic Obsidian
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#debec8'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#a68992'
  outline-variant: '#574048'
  surface-tint: '#ffb0cd'
  primary: '#ffb0cd'
  on-primary: '#640039'
  primary-container: '#f751a1'
  on-primary-container: '#570032'
  inverse-primary: '#b4136d'
  secondary: '#fbabff'
  on-secondary: '#580065'
  secondary-container: '#ae05c6'
  on-secondary-container: '#ffd8fd'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e4'
  primary-fixed-dim: '#ffb0cd'
  on-primary-fixed: '#3e0022'
  on-primary-fixed-variant: '#8c0053'
  secondary-fixed: '#ffd6fd'
  secondary-fixed-dim: '#fbabff'
  on-secondary-fixed: '#36003e'
  on-secondary-fixed-variant: '#7c008e'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The brand personality embodies precision engineering, high intelligence, and understated luxury. Designed for talent leaders, technical interviewers, and top-tier candidates, the interface eliminates cognitive noise to spotlight analytical signals, nuanced evaluation criteria, and real-time synthesis.

The design movement combines **Minimalism** with **Dark Glassmorphism** and **Linear-inspired Micro-surfacing**:
- Pure, pitch-black canvases establish a focused baseline where data hierarchies are distinct.
- Hot pink and electric magenta provide concentrated focal points, reserved for key user conversions, match evaluations, and high-leverage AI insights.
- Surfaces leverage fine hairline borders (1px) and dark translucent layering over deep charcoals, preventing visual clutter while conveying technical depth.
- Tactile interactions remain disciplined: deliberate micro-interactions, subtle luminous radial gradients, and monospaced quantitative anchors create an enterprise-grade developer tool feel.

## Colors

The system strictly defaults to a dark environment to minimize fatigue during long evaluation sessions and data reviews.

### Primary Palette & Gradients
- **Primary Accent (`#EC4899`)**: Drives focused actions, affirmative interactions, and key status anchors.
- **Secondary Accent (`#D946EF`)**: Pairs with primary to generate a signature AI directional gradient (`linear-gradient(135deg, #EC4899 0%, #D946EF 100%)`), used exclusively for AI-generated summaries, score badges, and primary interactive prompts.
- **Supporting Accents (`#F43F8B`, `#FB7185`)**: Used for hover states, focused indicators, and subtle glowing edges.

### Base Surfaces
- **Canvas Base (`#050505`)**: Global view background.
- **Layer 1 Surface (`#0D0D0D`)**: Outer structural containers, navigation shells, and sidebars.
- **Layer 2 Card (`#121214`)**: Default content cards, standard grid panels, and list rows.
- **Layer 3 Elevated (`#18181B` to `#1F1F23`)**: Modal dialogs, floating menus, popovers, and elevated hover overlays.

### Borders & Delimiters
- **Hairline Subtle (`#27272A`)**: Standard non-interactive dividers, panel divisions, and component outlines.
- **Hairline Active (`#323238`)**: Hovered cards, focused input perimeters, and active tab indicators.
- **Accent Ring (`rgba(236, 72, 153, 0.35)`)**: Focused input glow rings and elevated AI insight containers.

### Typography & Content
- **Text Primary (`#FAFAFA`)**: 100% emphasis headlines, essential readouts, primary copy.
- **Text Secondary (`#A1A1AA`)**: Metadata, field labels, structural navigation, secondary specs.
- **Text Tertiary (`#71717A`)**: Placeholders, disabled states, non-essential timestamps.

### System Indicators
- **Success (`#10B981` / `#34D399`)**: Stage passed, interview validated, high offer fit.
- **Warning (`#F59E0B`)**: Incomplete assessment, low confidence index, expiring requisition.
- **Info (`#38BDF8`)**: Candidate feedback queued, scheduled session, system event.

## Typography

Typography prioritizes sharp structural contrast and immediate data comprehension. 

- **Geist** drives primary narratives, headings, and functional UI copy. Its tightly tuned apertures and geometric rhythm maintain legibility across dense candidate timelines, transcripts, and evaluation scorecards.
- **JetBrains Mono** governs all quantitative evaluations, AI confidence metrics, time stamps, salary brackets, and score indicators. This structural separation instantly delineates subjective assessment notes from objective platform telemetry.

Headings feature negative tracking to establish an authoritative modern software aesthetic, while small mono labels feature expanded tracking for quick legibility in dense tables.

## Layout & Spacing

The layout is built on a 12-column fluid grid system paired with an 8px modular baseline:
- **Desktop (>= 1280px)**: 12-column fluid layout with `2rem` outer canvas padding and `1.5rem` gutters. Layouts reserve a fixed `260px` or `72px` collapsed navigation column, expanding data tables and assessment matrices flexibly across remaining width.
- **Tablet (768px - 1279px)**: 8-column layout. Navigation collapses to a slim icon rail or slide-out drawer; gutters scale down to `1rem` and page margins to `1.5rem`.
- **Mobile (< 768px)**: 4-column layout with `1rem` margins and `0.75rem` gutters. Secondary analytical sidecars stack vertically below core candidate profiles.

Inner elements rely strictly on the `space-*` scale to maintain rhythm:
- `space-xs` (4px): Icon-to-text inline gaps, micro pill padding.
- `space-sm` (8px): Input internal vertical padding, tight stack items.
- `space-md` (16px): Standard container padding, list item vertical separations.
- `space-lg` (24px): Card interior padding, panel separation.
- `space-xl` (40px): Section divisions in deep analytics views.

## Elevation & Depth

Visual hierarchy uses dark glassmorphism and subtle lighting rather than heavy drop shadows:

- **Tonal Layering**: Depth is achieved through controlled value stepping: Base `#050505` sits beneath Navigation `#0D0D0D`, which nests Card `#121214`, topped by Active `#1F1F23`.
- **Surface Borders**: Every surface layer is delimited by a `1px` border (`#27272A`), providing sharp definition against dark backdrops without clutter.
- **Glassmorphism**: Modals, sticky table headers, tooltips, and floating dock bars use `backdrop-filter: blur(16px)` with `background: rgba(18, 18, 20, 0.75)` and `border: 1px solid rgba(255, 255, 255, 0.08)`.
- **Hot Pink Ambient Luminescence**: High-value AI actions feature an ambient back-projected glow: `box-shadow: 0 0 40px -10px rgba(236, 72, 153, 0.2)`. On hover, elevated interactive cards display an edge highlight using `background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(236, 72, 153, 0.08), transparent 40%)`.
- **Elevation Shadows**: Where physical detachment is required (e.g., dropdowns, dialogs), use zero-spread deep shadows: `box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px #27272A`.

## Shapes

The interface balances generous radii on macro containers with disciplined structure on micro controls:

- **Base Curvature**: `rounded-md` (8px / `0.5rem`) on standard form inputs, menu items, table cell selectors, and nested action buttons.
- **Cards & Visual Containers**: `rounded-lg` (16px / `1rem`) on overview widgets, metric panels, and candidate cards.
- **Modals & Flyouts**: `rounded-xl` (24px / `1.5rem`) on dialog viewports, AI insight summaries, and floating command palettes.
- **Badges & Tags**: Full pill styling (`rounded-full`) for status indicators, pipeline tags, and AI score pills.

## Components

### Buttons
- **Primary AI Action**: Solid pink-to-magenta gradient (`#EC4899` to `#D946EF`) with white text, font weight 500, `0.5rem` radius, fine white inset border (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2)`). Hover increases brightness by 10% with a `rgba(236, 72, 153, 0.3)` ambient glow.
- **Secondary / Standard Action**: `#18181B` background, `1px solid #27272A`, `#FAFAFA` text. On hover: `#1F1F23` with `#323238` border.
- **Ghost Action**: Transparent background, `#A1A1AA` text. On hover: `#121214` background, `#FAFAFA` text.

### Inputs & Search Bars
- Background `#0D0D0D`, `1px solid #27272A`, `0.5rem` border radius, `#FAFAFA` text, `#71717A` placeholder.
- **Focus**: Border switches to `#EC4899` with a subtle outline ring: `0 0 0 2px rgba(236, 72, 153, 0.2)`.
- Icon prefixes (search lenses, filter glyphs) sit at `#71717A` resting, switching to `#FAFAFA` on focus.

### Cards & Panels
- Constructed from `#121214` with a crisp `1px solid #27272A` outline and `1rem` radius.
- Padding follows `space-lg` (24px). Headers feature Geist 500 typography paired with a JetBrains Mono count or badge.

### Candidate & Pipeline Lists
- Structured rows using `#0D0D0D` alternating with transparent bases. Bottom border `1px solid #1F1F23`.
- Hover triggers smooth transition to `#141417` across the full row.
- Score columns leverage JetBrains Mono with color-coded background badges:
  - Match >= 90%: `rgba(16, 185, 129, 0.1)` with `#34D399` text.
  - Match 70-89%: `rgba(245, 158, 11, 0.1)` with `#F59E0B` text.
  - Match < 70%: `rgba(113, 113, 122, 0.1)` with `#A1A1AA` text.

### Checkboxes & Radio Controls
- Base: 16px square or circle with `1px solid #323238` and `#0D0D0D` fill.
- Selected state: `#EC4899` fill, displaying a crisp white micro icon or center pip. Focus ring: `2px solid rgba(236, 72, 153, 0.3)`.

### Chips & AI Sparkle Badges
- **AI Sparkle Badge**: `rgba(236, 72, 153, 0.12)` background, `1px solid rgba(236, 72, 153, 0.35)`, `#FB7185` text. Prefixed by an SVG star/sparkle icon.
- **Standard Filter Chip**: `#18181B` fill, `#27272A` border, `#A1A1AA` text, pill-shaped. Hover sets border to `#323238` and text to `#FAFAFA`.

### Interview Sentiment & Telemetry Visualizers
- Multi-segment progress tracks using dark gutters (`#1F1F23`) with glowing fill overlays in `#EC4899` (AI confidence), `#38BDF8` (technical proficiency), and `#10B981` (cultural resonance).