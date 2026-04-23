# Synapse AI Design System (Antigravity v1.0) Ruleset

## 1. Core Visual Philosophy: "Space-Age Premium"
- **Aesthetic:** High-fidelity, emotion-driven design prioritizing depth, lighting, and glassmorphism.
- **Avoid:** Flat "bento grids", generic neon gradients, and inconsistent spacing.
- **Lighting:** Subdued environments (Space) with deliberate, focal illumination (Premium).

## 2. Color System (OKLCH)
We utilize the OKLCH color space for perceptual uniformity. Follow the **60-30-10 Rule**:
- **60% Base (Backgrounds):** `oklch(98% 0.005 80)` (Warm Off-White)
- **30% Secondary (Cards/Surfaces):** `oklch(100% 0 0)` (Pure White)
- **10% Accent (Interactive/CTAs):** `oklch(35% 0.01 80)` (Sleek Slate/Charcoal)

## 3. Typography & Hierarchy
- **Font:** Inter or System Sans.
- **Hierarchy:** Use font-weight, tracking (letter-spacing), and opacity to denote importance.
  - *Headings:* Tight tracking (`-0.04em`), stark white or subtle gradient.
  - *Body:* Relaxed tracking (`0.01em`), muted opacity (`oklch(75% 0 0)`).

## 4. Grid & Spacing
- **Strict 8-Point Grid:** Margins and padding must be multiples of 8 (8, 16, 24, 32, 64, 128).
- **Whitespace ("Luxury = Breathing Room"):** Over-index on margins between logical sections (e.g., `py-32`).

## 5. Psychology Integration
- **Hick's Law (Simplicity):** Reduce cognitive load. Minimal navigation links. One clear CTA per view.
- **Fitts' Law (Target Size):** Primary buttons must be generously sized (e.g., `py-4 px-8 rounded-full`) to invite interaction.
- **Miller's Law (Chunking):** Group features into blocks of 3 to 5 maximum. No walls of text.

## 6. Animation
- **Purposeful Motion:** Smooth easing curves, subtle entrances (`y: 20`, `opacity: 0` to `1`).
- No linear or jerky animations. Use Framer Motion defaults or custom spring physics.
