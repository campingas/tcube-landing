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

### The T-Cube palette (7 tokens)

Derived from Wada's catalogue. Combination reference: TODO

Current direction: TODO

| Token         | Wada # | Wada Name             | HEX       | Role                                         |
| ------------- | ------ | --------------------- | --------- | -------------------------------------------- |
TODO

---

### Proportion rule (Wada's own method)

Wada presented colour combinations as swatch bars of different widths. The width ratio is the proportion rule. T-Cube enforces it in every section:

| Weight | Role                                     | Tokens                      |
| ------ | ---------------------------------------- | --------------------------- |
| 60–70% | Dominant — backgrounds, large surfaces   | `wada-ink`                  |
| 20–30% | Supporting — mid-weight elements         | `wada-slate`, `wada-salmon` |
| 5–10%  | Accent — interactions, focus, highlights | `wada-rufous`               |

`wada-paper`, `wada-moss`, and `wada-teal` sit outside the surface rule when used as text colours.

In any section of the page, estimate the visual weight of each colour. If `wada-rufous` occupies more than 10% of the area, there is too much accent. Pull back.

---

### Usage rules

- **Background**: 
- **Primary text**: 
- **Secondary text / labels / captions**: 
- **CTA buttons**: 
- **Cards and raised surfaces**: 
- **Hardware illustrations**: 
- **Never**: 
- **Never** introduce a hex value not in this table without adding it to the table first with a Wada reference or an explicit exception note.

---

### Contrast audit (WCAG AA)

| Pair                          | Ratio   | Level    | Notes                           |
| ----------------------------- | ------- | -------- | ------------------------------- |
TODO

---

### How to add or change a colour

1. Find the colour in the Wada catalogue ([wscolors.com/colors](https://wscolors.com/colors)) or identify the closest existing token.
2. Add or update the row in the table above with the Wada # and name.
3. Add a note to the usage rules explaining where and why.
4. Run a contrast audit for any pair that involves the new token.
5. Update `tailwind.config.ts` — the `wada` object — in the same commit.
6. Add a version note at the bottom of this file.

---

## 2. Scale — Golden Ratio (φ = 1.618)

> "One word lands the target. No more 'bigger, too big, still too big'. Named scales mean a single word hits exactly."

Three independent φ-ladders cover every sizing decision in the project. They share the same multiplier but have different seeds, because objects, type, and spacing are different things.

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

### 2b. Type scale (seed: 16px)

Type lives on its own φ-ladder to keep reading sizes independent of object sizes.

| Token     | px  | rem   | Use                                                |
| --------- | --- | ----- | -------------------------------------------------- |
| `caption` | 10  | 0.625 | Legal, footnote, metadata                          |
| `body`    | 16  | 1.0   | Paragraph, UI label — the reading baseline         |
| `lead`    | 26  | 1.625 | Card body, intro paragraph, supporting copy        |
| `h3`      | 42  | 2.625 | Section subheading                                 |
| `h2`      | 68  | 4.25  | Section heading                                    |
| `h1`      | 110 | 6.875 | Hero headline — always `clamp()`-limited on mobile |

`h1` and `h2` use fluid sizing to prevent layout breakage on small screens:

```css
h1 {
  font-size: clamp(2.5rem, 8vw, 6.875rem);
}
h2 {
  font-size: clamp(1.75rem, 5vw, 4.25rem);
}
```

Never skip a level in the heading hierarchy for visual reasons — adjust weight or tracking instead.

---

### 2c. Spacing scale (Fibonacci-φ, seed: 8px)

Spacing and layout rhythm. Fibonacci values naturally converge with φ, so these feel inevitable.

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

| Role           | Family         | Use                                 |
| -------------- | -------------- | ----------------------------------- |
TODO

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

TODO

---

_Colour references verifiable at [wscolors.com](https://wscolors.com) (Wada Sanzo digital catalogue). Scale formula: φ = 1.618, object seed = 24px, type seed = 16px, spacing seed = 8px, divine leap god = hero × 2._
