# VISION.md — tcube-landing

> This file explains **why** the landing page exists, **who** it is for, and **what** it must communicate.
> It is not a spec — it is the north star that keeps every section, every word, and every pixel honest.
>
> Stack and code patterns → `docs/developer/architecture-guide.md`
> Colours, scale, voice, and the pre-ship checklist → `docs/developer/branding-guide.md`

---

## The one sentence

> T-Cube is a small, tactile device that reads short English sentences aloud to children first — then European and Asian languages — so they learn by listening, at any age, anywhere in the world.

Every section of the landing page must be able to defend its place against this sentence. If a section doesn't help a visitor understand or believe it, cut it.

---

## Why this landing page exists

T-Cube the hardware is quiet. It sits on a shelf, or in a child's hands, and does its job without announcing itself. The landing page has the opposite job: it has to speak clearly and quickly to a parent standing in a school corridor, a teacher evaluating tools for a bilingual classroom, or a maker who just discovered the project on GitHub — and it has to earn their trust before they leave.

This is not a product catalogue. It is a conversation starter. The page succeeds when a visitor finishes reading and thinks: _I want this for my child_, or _I want to build this_, or _I want to be part of this_.

---

## Who the page is for

### Primary — Families

The core audience is parents and caregivers of children between **2 and 14 years old**. Within that range, three distinct moments:

**Toddlers (2–5)** — Parents looking for a first connected object that is safe, screen-free, and doesn't rot attention. The pitch here is physical: a button you press, a short sentence or tiny recording that plays, nothing to scroll or swipe. T-Cube is a child's first encounter with AI — and it is gentle, bounded, and entirely in the hands of the family.

**Young children (5–10)** — Parents in multilingual families or international school contexts who want their child to build a second or third language naturally, through listening and repetition, without drilling. T-Cube grows with the child: the same device that starts with short English sentence recordings can later read generated practice sentences in French, Spanish, Chinese, Vietnamese, and other languages.

**Older children and tweens (10–14)** — Students who can engage more actively: choosing content, customising their device, sharing designs. T-Cube becomes an object of ownership, not just a toy. This is also where the handoff to the maker orbit begins — the curious 12-year-old who wants to know what's inside the box.

The family audience does not want to understand the hardware. They want to trust the product. The landing page earns that trust through clarity, warmth, and evidence — not feature lists.

### Secondary — Makers and the CyberDeck Community

A smaller but important orbit: developers, hardware enthusiasts, and the open-source maker community. They found T-Cube through GitHub, a forum post, or a friend. They are not buying a product — they want to build one, contribute to one, or fork one.

For this audience the page is a gateway, not a sales pitch. They need to see: the hardware is real and reproducible, the software is open, the community is alive, and the build process is documented.

The maker sections do not dilute the family message. They run parallel — the same page, a different scroll depth, a clearly signposted entry point.

---

## What the page must communicate

These are the five things a visitor must be able to say after leaving the page. Not remember verbatim — _say_, in their own words.

1. **"T-Cube is a device for children that teaches languages through listening."**
   — The product is understood. Not "some kind of AI thing" or "an educational platform".

2. **"It's safe for small children and grows with them."**
   — The safety and longevity arguments land. A parent can justify the purchase across years, not just months.

3. **"My family's situation fits — we speak more than one language / our child is at an international school / we want something screen-free."**
   — At least one use case resonates personally.

4. **"I can see how to get one or build one."**
   — There is a clear next step. The path forward is not hidden behind a contact form.

5. **"This is made by people who care about children, not just technology."**
   — The tone and the design do the work here. This is why the branding guide exists.

---

## Section map

### v1 — Must ship

#### Hero

**Job:** answer "what is this?" in under five seconds.

One headline. One subheadline. One visual. One CTA. Nothing else.

The visual is the T-Cube device in a child's hands or on a child's shelf — not a render, not a diagram. The headline follows the canonical product sentence. The CTA points to either the build guide or a contact/interest form — whichever path is further along at launch.

The hero does not explain features. It creates enough curiosity and trust that a visitor scrolls.

---

#### Product pitch — What T-Cube is and why it exists

**Job:** make the right parents feel seen.

Three sub-sections, each targeting one of the three family moments (toddlers / young children / tweens). Short. Portrait of the child first, product second. No bullet-point feature lists — narrative, not spec.

This is also where the "first AI safe step" argument lives. The framing: most children's first encounter with AI is a screen algorithm serving content at them. T-Cube inverts that — the child controls what plays, there is no feed, no recommendation engine, no screen. It is AI in service of listening, not AI in service of engagement metrics.

Current content focus is intentionally small: short sentence recordings and generated sentence packs. Stories, long lessons, songs, and richer curricula are future content layers, not the immediate product promise.

The Kawaii tactile angle lives here too: the physical interface — the button matrix, the textures, the glow patterns — is designed to be touched, not just pressed. It signals play, not homework.

---

#### How to build and install

**Job:** make the maker path legible and give technically-curious parents confidence.

This section serves two audiences at once:

For **makers**: a clear, honest build overview. Not a full tutorial — that lives in the documentation. But enough to see that the hardware is real, the BOM is open, and the software can be installed. A link to the full docs. A link to the GitHub repo.

For **technically-curious parents**: seeing the build process demystifies the product. A parent who understands that T-Cube is a Raspberry Pi with open firmware trusts it more than a sealed black box.

Tone here shifts slightly — still warm, but more direct and technical. This is the one section where precise language ("Raspberry Pi Zero 2W", "I2S audio", "open-source firmware") earns trust rather than alienating.

The hardware finder (helping users locate components nearby — Nhật Tảo and equivalent markets in other cities) is a **future** feature, noted here as a placeholder for v2.

---

#### Join the T-Cube community + lead capture

**Job:** convert interest into a relationship.

A short closing section. Two paths, clearly separated:

**For families:** a simple interest form. Name, email, city, number of children and ages. No more. Privacy-first framing — data is used only to notify when T-Cube is available in their region. RGPD-compliant by design: opt-in explicit, no third-party data sharing, analytics via a self-hosted or privacy-respecting tool (Plausible, Umami, or equivalent). No Google Analytics.

**For makers and contributors:** a link to the GitHub organisation, the community forum or Discord, and the contribution guide.

The CTA copy follows voice rules: specific and direct, not "Sign up for our newsletter".

> "Tell us about your family — we'll let you know when T-Cube is ready near you."
> "Build with us — the hardware and software are open."

---

### Future — Defined but not v1

#### Use cases per age group

A dedicated section or sub-page showing T-Cube in context across the 2–14 range. Day-in-the-life vignettes. What the child presses, what they hear, how the content grows with them.

Deferred because it requires real content (sentence packs, recordings, lesson examples, real family photos or illustrations) that don't exist yet. A placeholder with honest "coming soon" framing is acceptable in v1 if the rest of the page is strong.

---

#### Community sharing — button designs, voice patterns, content

The social layer of T-Cube: families and makers sharing their button shapes, glow patterns, and generated content. A gallery. A submission flow. A simple profile for contributors.

This is meaningful but requires backend infrastructure (storage, moderation, accounts) that is out of scope for a static landing page. Defer to v2. In v1, acknowledge the community dimension in the closing section without promising a platform that doesn't exist yet.

---

#### Hardware finder

A tool to help users find Raspberry Pi components, jumper wires, and breakout boards at local markets and suppliers — starting with Nhật Tảo (District 10, Ho Chi Minh City) and expanding by region.

Deferred to v2. Requires a maintained database and a geolocation flow.

---

## Design rationale summary

Every visual and copy decision on this page is traceable to one of these four choices:

**1. Families over features.**
The product is technically interesting. The landing page is not the place to prove it. Parents do not need to understand I2S audio or TTS models — they need to understand that their child will press a button and hear a clear English sentence first, then short practice sentences in other languages. Lead with the child's experience, not the engineer's solution.

**2. Screen-free is a feature, not a limitation.**
In a market saturated with tablets and apps, the absence of a screen is T-Cube's most differentiating quality. It is not a missing feature. Frame it as a deliberate choice and explain why: listening builds language acquisition, tactile interfaces build fine motor skills, no screen means no algorithm, no endless scroll, no blue light at bedtime.

**3. Open is a trust signal.**
For families, knowing the hardware is open and the software is auditable is reassuring — not intimidating. For makers, it is the invitation. The word "open" appears on the page. The GitHub link is visible without hunting for it.

**4. Grows with the child.**
A device that becomes obsolete when the child turns 6 is a toy. A device that changes role — from bedtime story listener to language practice partner to maker project — is an investment. The 2–14 age range is not marketing padding. The page must make that arc believable.

---

## What this page is not

- **Not a documentation site.** The full build guide, API reference, and hardware specs live in the docs. The landing page links to them — it does not host them.
- **Not a shop.** T-Cube is open hardware. The page does not sell a product. It converts interest into community membership and qualified leads.
- **Not a startup pitch.** The language is warm and direct, not investor-facing. Avoid words like "scale", "traction", "market", "users".
- **Not finished.** The landing page is a living document. As T-Cube reaches new communities, age groups, and countries, sections will be added and the copy will evolve. VISION.md evolves with it — update this file before changing the page's structure or primary message.

---
