# Branding Guide — T-Cube

> Part of the `docs/developer/` suite. This file is **independent of the stack**.
> It can be updated, debated, and versioned without touching any code.
> When a token changes here, the only code file that needs updating is `tailwind.config.ts`.
>
> For stack, lint rules, and code patterns → [`architecture-guide.md`](./architecture-guide.md).

---

## How to use this guide

This document has four layers. Each can be iterated independently:

1. **Colour** — Sanzo Wada palette, token names, proportion rules, contrast audit
2. **Scale** — Golden ratio size scale (objects + type + spacing)
3. **Voice** — Tone model, writing rules, copy patterns
4. **Checklist** — The Jobs pre-ship gate

When iterating, mark changed sections with a version note at the bottom. Keep the old values commented out for one release cycle before deleting them.

---

## 1. Colour — Sanzo Wada Foundation

### Why Wada

Sanzo Wada (1883–1967) was a Japanese painter, Oscar-winning costume designer, and the founder of the Japan Standard Colour Association. His _A Dictionary of Color Combinations_ (originally published 1933, reissued Seigensha 2010) catalogs 348 colour combinations across 159 named colours. <br>
Reference: [wscolors.com](https://wscolors.com) · [sanzo-wada.dmbk.io](https://sanzo-wada.dmbk.io)

His method is not a formula — it's an eye. Every combination in his dictionary was chosen because it simply _works_. His reds are terracotta, not fire. His blues lean slate, not sky. His yellows are ochre-gold, not lemon. The palette never ages because it was never trend-dependent.

**Why Wada for T-Cube specifically?**

T-Cube bridges educational tradition with modern hardware. Wada's palette lives at the same intersection — Eastern chromatic sensibility, organic warmth, zero tech-industry coldness. A child's first learning device should not look like a startup pitch deck.

---

### The T-Cube palette

Current source: reconciled against the W.S. Colors public catalogue on 2026-06-27.

Current direction: warm paper surface, deep ink text, and tactile button accents. The page should feel child-safe, handmade, serious, and open. It should not feel like a generic AI SaaS page.

Verification method: extracted all 159 colour cards from `https://wscolors.com/colors`, then compared the prototype hexes against catalogue hexes in CIE Lab distance. Where the nearest catalogue colour broke the intended warmth or role, the selected Wada colour is marked as a product-fit reconciliation rather than a strict nearest match.

| Token       | Wada # | Wada name                 | Reconciled HEX | Prototype comment       | Role                                                                      |
| ----------- | ------ | ------------------------- | -------------- | ----------------------- | ------------------------------------------------------------------------- |
| `paper`     | 154    | White                     | `#ffffff`      | `/* proto #F7F4EF */`   | Main page background, light text on dark sections, primary light surface  |
| `paperSoft` | 39     | Sulpher Yellow            | `#f5ecc2`      | `/* proto #EFEBE4 */`   | Alternate warm section background and soft card/icon surfaces             |
| `ink`       | 159    | Black                     | `#111314`      | `/* proto #1C1A17 */`   | Primary text, dark sections, primary CTA background, cube faces           |
| `inkMid`    | 158    | Slate Color               | `#34454c`      | `/* proto #4A4540 */`   | Body copy, secondary navigation text                                      |
| `inkSoft`   | 157    | Warm Gray                 | `#a1a39a`      | `/* proto #8C867D */`   | Labels, captions, low-emphasis metadata                                   |
| `coral`     | 19     | Etruscan Red              | `#c55347`      | `/* proto #D4614A */`   | Primary accent, hero emphasis, family CTA surface, first cube button      |
| `teal`      | 102    | Light Porcelain Green     | `#00908a`      | `/* proto #3D8A85 */`   | Secondary accent, second cube button, learning/science cue                |
| `amber`     | 70     | Khaki                     | `#bc892b`      | `/* proto #C8922A */`   | Tertiary accent, third cube button, warm learning cue                     |
| `violet`    | 142    | Dark Soft Violet          | `#66629c`      | `/* proto #6B5B8C */`   | Older-child/teacher-mode accent, fourth cube button                       |
| `sage`      | 99     | Pistachio Green           | `#648f7b`      | `/* proto #5A7A5E */`   | Open-hardware/trust accent, fifth cube button, low-key success indicator  |

Selection notes:

- `paper`: strict nearest Wada match is White. Keep the prototype parchment value as a comment until the implemented page is visually reviewed with the reconciled palette.
- `paperSoft`: strict nearest match is also White. `Sulpher Yellow` is selected as the closest warm Wada surface that preserves the prototype's parchment intent.
- `inkSoft`: `Andover Green` is the strict nearest match, but `Warm Gray` better preserves the low-emphasis neutral label role.

---

### Proportion rule (Wada's own method)

Wada presented colour combinations as swatch bars of different widths. The width ratio is the proportion rule. T-Cube enforces it in every section:

| Weight | Role                                     | Tokens                      |
| ------ | ---------------------------------------- | --------------------------- |
| 60–70% | Dominant — backgrounds, large surfaces   | `paper`, `paperSoft`, `ink` |
| 20–30% | Supporting — text and quiet structure    | `inkMid`, `inkSoft`         |
| 5–10%  | Accent — interactions, buttons, signals  | `coral`, `teal`, `amber`, `violet`, `sage` |

The accent colours should usually appear as button glows, small bars, labels, section emphasis, or one large CTA surface. They should not dominate whole page sections except for the family CTA card.

In any section of the page, estimate the visual weight of each colour. If a single accent colour occupies more than 10% of the area, there is too much accent. Pull back.

---

### Usage Rules

- **Background**: Use `paper` for the main page, `paperSoft` for alternate bands and raised quiet surfaces, and `ink` only for the learning layer and footer.
- **Primary text**: Use `ink` on light surfaces and `paper` on dark surfaces.
- **Secondary text / labels / captions**: Use `inkMid` for readable body support. Use `inkSoft` only for captions, labels, and metadata at `body` size or larger when contrast allows.
- **CTA buttons**: Use `ink` with `paper` text for the default primary CTA. Use `coral` for hover states and the family capture card. Use white text on coral only for large text or non-critical short labels because contrast is below AA for normal body copy.
- **Cards and raised surfaces**: Use `paper` on `paperSoft`, or `paperSoft` on `paper`. Separate cards with subtle ink borders around `rgba(28, 26, 23, 0.06–0.10)`.
- **Hardware illustrations**: In light mode, use `ink` / Wada Black `#111314` for cube faces and the five accent colours for luminous buttons. In dark mode, the hero cube inverts to Wada White `#ffffff` with light warm-gray shading so the object stays visible against the dark page. Cube faces should have subtle layered gradients, fine texture, inset highlights, and enough edge contrast to remain legible. Button colour should feel tactile and luminous, with glow and inner highlight effects, not flat neon.
- **Theme behavior**: The current page styling is the light theme. Dark mode uses `data-theme="dark"` and CSS-variable-backed `wada-*` tokens, follows OS preference until the visitor chooses a mode, and keeps accent colours stable.
- **Dark sections**: Use `ink` background with `paper` headings and translucent `paper` text for secondary copy.
- **Never**: Do not use pure black for text, saturated tech blue, purple-blue gradients, beige-only monochrome sections, or decorative gradient blobs.
- **Never** introduce a hex value not in this table without adding it to the table first with a Wada reference or an explicit exception note.

---

### Contrast audit (WCAG AA)

| Pair                          | Ratio   | Level    | Notes                           |
| ----------------------------- | ------- | -------- | ------------------------------- |
| `ink` on `paper`              | 18.63   | AAA      | Primary body and heading pair   |
| `inkMid` on `paper`           | 9.99    | AAA      | Secondary body copy             |
| `inkSoft` on `paper`          | 2.55    | Fail     | Decorative/large metadata only  |
| `paper` on `ink`              | 18.63   | AAA      | Dark-section headings/body      |
| `paperSoft` on `ink`          | 15.67   | AAA      | Dark-section soft text          |
| `paper` on `coral`            | 4.47    | Large AA | Borderline for normal text; use for CTA labels only |
| `teal` on `paper`             | 3.92    | Large AA | Accent only, not body text      |
| `amber` on `paper`            | 3.11    | Fail     | Accent only, never text         |
| `violet` on `paper`           | 5.54    | AA       | Usable for normal text if needed |
| `sage` on `paper`             | 3.65    | Large AA | Accent/large labels only        |

---

### How to add or change a colour

1. Find the colour in the Wada catalogue ([wscolors.com/colors](https://wscolors.com/colors)) or identify the closest existing token.
2. Add or update the row in the table above with the Wada # and name.
3. Add a note to the usage rules explaining where and why.
4. Run a contrast audit for any pair that involves the new token.
5. Update `tailwind.config.ts` — the `wada` object — in the same commit.
6. Add a version note at the bottom of this file.

---

## 2. Scale

> "One word lands the target. No more 'bigger, too big, still too big'. Named scales mean a single word hits exactly."

The current prototype uses a pragmatic landing-page scale: a compact modular type ladder, generous section spacing, and soft tactile radii. The earlier golden-ratio direction remains useful for object-size naming, but implementation should follow the current prototype values unless the page is redesigned.

---

### 2a. Object size scale (seed: 24px)

Used for: icons, illustrations, hardware visuals, logo marks, image containers.

| Name    | px  | Derivation | Use                                                                            |
| ------- | --- | ---------- | ------------------------------------------------------------------------------ |
| `stamp` | 24  | seed       | Icon, avatar, favicon render, tight inline element                             |
| `chip`  | 39  | 24 × φ     | Badge, tag, inline illustration, button icon                                   |
| `tile`  | 63  | 39 × φ     | Feature icon, card thumbnail                                                   |
| `block` | 102 | 63 × φ     | Section illustration, hardware chip image, partner logo                        |
| `hero`  | 164 | 102 × φ    | Hero device illustration, primary section visual                               |
| `god`   | 328 | hero × 2   | Full-width landing signature element (**divine leap — breaks φ deliberately**) |

The `god` tier is reserved for the single most important visual on the page. Currently: the T-Cube device illustration in the hero section. Do not promote anything else to `god` without removing the current occupant.

**The one-word rule**: in code review and in conversation, use the scale name — not the pixel value. _"The language flag grid tiles are `tile`, not `chip`"_. The name carries intent; the pixel value is just today's output.

---

### 2b. Type Scale

Prototype base: `17px` on the root element with a 1.2 modular ratio. This gives the page a quieter, editorial rhythm than the earlier φ type scale.

| Token    | rem     | Approx px at 17px root | Prototype var | Use                                      |
| -------- | ------- | ---------------------- | ------------- | ---------------------------------------- |
| `xs`     | 0.694   | 12                     | `--t-xs`      | Eyebrows, labels, metadata, privacy copy |
| `sm`     | 0.833   | 14                     | `--t-sm`      | Card body, nav, form fields              |
| `base`   | 1       | 17                     | `--t-base`    | Body baseline                            |
| `md`     | 1.2     | 20                     | `--t-md`      | Hero subcopy, intro copy, compact h3     |
| `lg`     | 1.44    | 24                     | `--t-lg`      | Logo, small section heading              |
| `xl`     | 1.728   | 29                     | `--t-xl`      | Card headings, secondary visual type     |
| `2xl`    | 2.074   | 35                     | `--t-2xl`     | Large supporting heading                 |
| `3xl`    | 2.488   | 42                     | `--t-3xl`     | Section heading max and hero min         |
| `4xl`    | 3.157   | 54                     | `--t-4xl`     | Reserved display step                    |
| `5xl`    | 4.209   | 72                     | `--t-5xl`     | Hero headline max                        |

`h1` and `h2` use fluid sizing to prevent layout breakage on small screens:

```css
h1 {
  font-size: clamp(var(--t-3xl), 5vw, var(--t-5xl));
}
h2 {
  font-size: clamp(var(--t-xl), 3.5vw, var(--t-3xl));
}
```

Never skip a level in the heading hierarchy for visual reasons — adjust weight or tracking instead.

---

### 2c. Spacing scale (Fibonacci-φ, seed: 8px)

The prototype uses organic spacing values close to the Fibonacci rhythm, expressed in rems and clamps. Keep this rhythm when migrating to Tailwind tokens.

| Token       | px  | Use                                     |
| ----------- | --- | --------------------------------------- |
| `rhythm-1`  | 8   | Tight inline gap, icon-to-label         |
| `rhythm-2`  | 13  | Component inner padding, button padding |
| `rhythm-3`  | 21  | Card padding, form field gap            |
| `rhythm-5`  | 34  | Between related elements in a section   |
| `rhythm-8`  | 55  | Section inner top/bottom padding        |
| `rhythm-13` | 89  | Between sections on the page            |
| `rhythm-21` | 144 | Hero vertical breathing room            |

The token names (`rhythm-N`) follow the Fibonacci index, not the pixel value. This makes the sequence self-documenting: `rhythm-5` is always after `rhythm-3` in the Fibonacci sequence.

---

### 2d. Typography pairing

T-Cube uses three typeface roles. These are current defaults — subject to change if a better pairing is found. Update this section and `tailwind.config.ts` in the same commit.

| Role             | Family                                    | Use                                      |
| ---------------- | ----------------------------------------- | ---------------------------------------- |
| Body/UI          | `DM Sans`, `system-ui`, `sans-serif`      | Body copy, nav, labels, forms, CTAs      |
| Display          | `DM Serif Display`, `serif`               | Logo, hero headline, section headings    |
| Code/technical   | `SF Mono`, `Fira Mono`, `monospace`       | Inline code such as `learning.md`        |

Display headings use tight line height and slight negative tracking in the prototype. Preserve the soft editorial quality, but avoid negative letter spacing where the implementation standard forbids it.

---

### 2e. Radius and Tactile Shape

The prototype’s shape language is soft and tactile.

| Token      | px   | Prototype var | Use                                      |
| ---------- | ---- | ------------- | ---------------------------------------- |
| `radius`   | 12   | `--radius`    | Pills, science cards, maker links        |
| `radiusLg` | 24   | `--radius-lg` | Card groups, section panels, BOM card    |
| `cubeFace` | 28   | direct value  | Cube faces only                          |
| `pill`     | 999  | direct value  | CTAs and nav CTA                         |
| `field`    | 8    | direct value  | Form inputs and small icon containers    |

Cards should be soft but not toy-like. The cube can be rounder than the interface because it represents the physical product.

---

### 2f. Prototype Component Direction

- **Navigation**: Fixed top nav, translucent `paper` background, blur, subtle lower border, serif logo with coral dot.
- **Hero**: Two-column desktop layout with copy left and CSS cube right; mobile stacks cube above copy. The hero visual is the first-viewport product signal.
- **Cube visual**: Lazy-loaded Three.js hero scene with a rounded cube body, theme-aware tactile material, soft lighting, point-lit button glow, and pointer/touch drag rotation. The cube is Wada Black in light mode and Wada White with light shaded texture in dark mode. Each non-bottom face has exactly one centered glowing button. The bottom face is blank. Keep Three out of the initial bundle through dynamic import unless the performance budget is revised.
- **Age cards**: Three-column split panel on desktop, one column on mobile, separated by thin ink dividers and small accent bars.
- **Learning layer**: Full dark `ink` section with three mode cards and a horizontal curation loop that stacks on mobile.
- **Build section**: `paperSoft` background with text and BOM card. Technical language is acceptable here.
- **Community section**: Split path: coral family feature poll with local results, quiet maker card with links. The poll asks what feature families want first and must not request personal contact details in v1.
- **Footer**: Dark `ink` footer with low-contrast metadata and coral logo dot.

---

## 3. Text/Voice — Confident, Warm, Cheerful, Legible

T-Cube speaks the way a great teacher does: they know exactly what they're talking about, they care deeply that you understand it, and they make the subject feel like the most natural thing in the world.

---

### The four-word model

These four words are not adjectives for the brand — they are functional constraints on every piece of copy.

**Confident** — Never hedge. State the thing directly.

> ✗ "T-Cube can help your child potentially learn more languages."
> ✓ "T-Cube teaches languages."

**Warm** — Address the child and parent as people, not users or stakeholders.

> ✗ "Empowering learners across multilingual environments."
> ✓ "Your child learns by listening."

**Cheerful** — The product is joyful. The copy can smile without exclamation marks. Light energy, not hype energy. One genuine moment beats ten superlatives.

> ✗ "Revolutionary! Game-changing! Breakthrough learning!"
> ✓ "A story for every lesson."

**Legible** — Short sentences. Active voice. One idea per sentence. No jargon that needs decoding.

> ✗ "Leveraging AI-powered multilingual TTS infrastructure."
> ✓ "T-Cube reads short English sentences aloud."

---

### Writing checklist (run before shipping any copy string)

1. **10-year-old test** — can a child understand every word? Read it aloud.
2. **Active voice test** — is the verb active? Rewrite passives.
3. **Hedge detector** — is there a hedge word (`can`, `may`, `help`, `potentially`, `try to`)? Delete it.
4. **Word count test** — is it shorter than the last draft? If it reads cleanly at 8 words, it doesn't need 12.

---

### Copy patterns

| ✗ Avoid                                    | ✓ Use instead                                                  | Why                                  |
| ------------------------------------------ | -------------------------------------------------------------- | ------------------------------------ |
| "Revolutionary learning experience"        | "One sentence at a time."                                      | Specificity beats superlative        |
| "Our platform leverages AI-powered TTS"    | "T-Cube reads short English sentences aloud."                  | Name the action, name the language   |
| "Designed with educational best practices" | "Built the way good teachers teach."                           | Human analogy, not methodology-speak |
| "Easy-to-use interface"                    | "Press play. That's it."                                       | Show the simplicity, don't claim it  |
| "Seamless multilingual support"            | "English on default." | Sequence and specificity             |
| "Empowering the next generation"           | "Your child learns by listening."                              | Direct, true, human                  |
| "Users can access content via the device"  | "Pick it up. Press the button."                                | Instructions, not documentation      |

---

### Language

English is the default language and the first content library.

- Bilingual labels are acceptable only when a section is explicitly about a specific language (`Listen / Écouter`).
- Bilingual sentences are not (`"T-Cube giúp children học ngôn ngữ mới"`).
- When writing English for this codebase, write as if it will later be translated into European and Asian languages — no English idioms, no culture-specific wordplay, no puns that don't survive translation.
- Tone in every translated language should be warm and direct, matching the four-word model above.
- Current content claims must stay small: short sentence recordings and generated sentence packs. Do not promise full story libraries, songs, or complete curricula until those assets exist.

---

### The canonical product sentence

Every developer and designer on this project should be able to complete this sentence without thinking:

> _"T-Cube is \_\_\_."_

The landing page hero section must communicate the same answer. If the section and this sentence diverge, the section is wrong — not the sentence.

**Canonical answer:**

> T-Cube is a small, solid cube — soft at the edges, satisfying to hold. Five of its faces carry tactile, luminous buttons. Each button plays a sound: recorded by a parent, uploaded from a library, or generated by AI. The default voice speaks English, but any language, any accent can be set — French, Spanish, Mandarin, whatever the family speaks at home or needs at school. Press a button, hear a word, hear a story, hear a lesson. That is the entire interaction — and behind it, an invisible curriculum built on how children actually learn. No screen, no menu, no account to log in to. Just a child's hand and a sound that plays.

---

## 4. The Jobs Checklist

Steve Jobs' design review was a single repeated question: _"Is this the best we can do?"_ — followed by silence until someone answered honestly.

This checklist runs **after `just verify` passes**, before any merge to `main`. It is not optional on sections that are customer-facing. It is optional on internal tooling sections (config, utils) where the checklist doesn't apply.

---

### Gate 1 — The 10-foot test

Stand back from the screen, or reduce browser zoom to 50%. Look at the section.

Does the most important thing on this section read instantly — before reading anything?

- **Yes** → pass.
- **No** → the visual hierarchy is wrong. Fix type weight or scale before reviewing copy. Do not ship.

---

### Gate 2 — Remove one element

After you think a section is finished: remove one element. Any element. Then look.

- **The section improves** → that element was decoration. Delete it permanently.
- **The section suffers** → the element earns its place. Restore it.

This is Coco Chanel's mirror rule applied to UI: _"Before leaving the house, look in the mirror and remove one accessory."_ Run it for every section, every release.

---

### Gate 3 — The stranger test

Show the section to someone who has never heard of T-Cube. Give them exactly 5 seconds. Then cover the screen and ask: _"What does this company do?"_

- **They answer correctly** → pass.
- **They cannot answer** → the headline or the primary visual is doing the wrong job. Rewrite before shipping.

The stranger can be a family member, a friend from another field, anyone. Not a colleague who has been in the project.

---

### Gate 4 — One-sentence match

Does the hero section communicate the canonical product sentence from §3?

> T-Cube is a small device that reads short English sentences aloud to children first — then European and Asian languages — so they learn by listening.

If a visitor could leave the hero section with a materially different understanding of what T-Cube is, the section is wrong.

---

### Gate 5 — Speed check

```bash
just build && just preview
```

Open DevTools → Network → throttle to "Slow 3G". Reload.

The page must be interactive — LCP painted, JS evaluated, first CTA visible — in under 4 seconds.

If it isn't, **no design work ships** until performance is recovered. A slow page is a broken product. Design serves the user; a page they're waiting for serves no one.

---

### Gate 6 — One-interaction rule

A landing page has one job: move the visitor to the next step (contact form, download, partner enquiry).

For each section on the page: does it point toward that step? If a section exists that does not contribute to the CTA path — cut it, or rewrite it to point forward. Decoration is a tax on attention.

---

### Gate 7 — The red-pen pass

Read every text string visible on the page. For each one, ask: _"If I removed this, would anyone notice something missing?"_

- Subheadings that just repeat the heading → cut.
- Bullet points that say the same thing as the paragraph above → cut.
- Parenthetical explanations that the reader doesn't need → cut.
- Feature lists that describe implementation, not benefit → rewrite.

What remains is the page.

---

## Quick Reference Card

For use when writing template strings, reviewing PRs, or checking designs.

- Use `paper` / `paperSoft` for warm light surfaces and `ink` for text or dark sections.
- Use `coral` as the primary accent and family CTA colour; use `teal`, `amber`, `violet`, and `sage` as small signal colours.
- Do not use `amber`, `teal`, `sage`, `inkSoft`, or white-on-coral for long normal-size body text.
- Body/UI font is `DM Sans`; display font is `DM Serif Display`; technical inline code uses a monospace stack.
- Root font size is `17px`; type follows the prototype’s 1.2 modular scale from `xs` through `5xl`.
- CTAs are pill-shaped; cards use `radiusLg`; the physical cube can be softer and rounder than interface cards.
- Cube faces use Wada Black `#111314` in light mode and Wada White `#ffffff` with light shading in dark mode; each non-bottom face has one centered button and the bottom face has none.
- Hero layout must show the product signal in the first viewport: copy plus animated/tactile cube.
- Keep copy warm, direct, and concrete. Do not write generic AI-platform language.
- Preserve the static-page constraint unless architecture changes are documented first.

---

_Current palette source: reconciled Wada catalogue tokens, with prototype hex values retained as comments in the palette table. Object scale keeps the φ naming ladder; type follows the current prototype’s 1.2 modular scale._

## Version Notes

- 2026-06-27: Exported current visual design inputs from `tcube-landing.html` into this guide: palette, contrast notes, type pairing, modular type scale, radii, component direction, and quick reference card.
- 2026-06-27: Reconciled prototype colours against W.S. Colors catalogue entries and retained prototype hex values as comments beside each Wada-backed token.
- 2026-06-27: Replaced CSS hero cube direction with a lazy-loaded interactive Three.js scene using rounded geometry, tactile dark material, soft lights, glowing button meshes, and pointer drag rotation.
- 2026-06-28: Added light/dark theme guidance and updated the hero cube direction: black cube in light mode, white/light-shaded cube in dark mode, accent button glows unchanged.
