---
name: blog-copywriting
description: Write or edit Aaron Reisman's blog posts in src/content/blog-postings/ so they read like a thoughtful person wrote them casually. Use when drafting a new post, rewriting an existing one, or editing prose anywhere in the blog. Anchored to four reference voices (Comeau, Dodds, Abramov, McCord) plus a strict checklist that strips common AI tells.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash(ls *)
  - Bash(grep *)
  - Bash(wc *)
---

# Blog copywriting for lifeiscontent.net

Aaron writes how-tos and short manifestos about React, TypeScript, Phoenix LiveView, Elixir, Ash, and component design. Posts live in `src/content/blog-postings/` as `.mdx` files with YAML frontmatter and code blocks.

The voice should sound like Aaron talking to another senior practitioner over coffee. Confident but not lecturing. Personal but not performative. The reader's time is valuable.

## Anchor voices

When in doubt, ask: would Comeau, Dodds, Abramov, or McCord write it this way?

**Josh Comeau** — friendly, vulnerable openings, concrete metaphors, light self-deprecation. He'll admit he didn't understand something for years before explaining it. Use when introducing a topic that intimidates people.

> "So, I'll be honest. I had been working professionally with React _for years_ without really understanding how React's re-rendering process worked."

**Kent C. Dodds** — direct, opinionated, anticipates objections in the reader's voice ("Ok, Kent, sure..."). Genuine enthusiasm without hype. Use for prescriptive how-tos.

> "Managing state is arguably the hardest part of any application."

**Dan Abramov** — reflective, pedagogical, uses short rhetorical pivots ("Or can we?"), humble conclusions that credit prior work, willing to change his own mind in print. Use for essays and reframes.

> "This is not a new idea. It's a natural consequence of React composition model. It's simple enough that it's underappreciated, and deserves a bit more love."

**Chris McCord** — narrative-driven origin stories, scaffolded technical explanations, "imagine your boss asks you..." setups, grounded confidence. Use for posts that walk through a real system.

> "Imagine your boss asks you to display how many other visitors are viewing..."

What they share: second person, varied sentence length, code blocks introduced by context (not dropped raw), confidence without grandiosity, and a sense that the writer has actually shipped this code.

## The editing checklist

Apply in order. Do not skip steps even on a quick edit.

### 1. Meaning lock

Before changing a word, list the post's promises, facts, numbers, and references. Do not alter them in the rewrite. If the draft cites a library version, an exception class, a function name, or a benchmark, those stay. New facts cannot be invented.

### 2. Length budget

Stay within ±10% of the original word count unless the user asks otherwise. Padding to hit a target is worse than tightening below it. Trim before you expand.

### 3. Strip the eight AI tells

These are the common giveaways. Hunt each one explicitly.

1. **Em dashes (`—`)** — replace with periods or commas. At most one per post, only if truly emphatic. No triple-dash rhythm.
2. **Corporate Trinity** — three-item rhetorical lists with parallel structure ("clear, concise, compelling"). Vary list lengths to 2, 4, or 5. Avoid canned alliteration.
3. **Fake profundity** — "It's not about X, it's about Y." State the point directly with a reason or example.
4. **Cringe transitions** — "The kicker?" "The secret?" "Here's the thing..." Cut them. Replace with a straight statement: "What matters is..."
5. **Corporate gerunds** — "highlighting, emphasising, facilitating, leveraging, orchestrating." Swap for active verbs: "shows, helps, uses, runs, works with."
6. **Archaic connectors** — "moreover, furthermore, in today's ever-evolving landscape." Use "also, and, so, meanwhile."
7. **Hype adjectives** — "powerful, groundbreaking, transformative, seamless, robust." Default to "useful, solid, worth trying" unless the stakes are genuinely big.
8. **Missing fingerprints** — if the post is generic, add one micro-example or quick aside that's already implied by the draft. Never invent technical facts. If nothing's there, tighten instead.

### 4. Voice and rhythm

- Mix short punchy lines with longer reflective ones.
- Allow light hedges where natural: "I think," "maybe," "to be honest." Use sparingly.
- Active voice. Second person where it fits.
- Prefer simple words over formal ones.
- One short aside or imagined reader reaction per section is enough.

### 5. Hard deletions

Always remove:

- **Semicolons** in prose. Use periods or commas. Code blocks are exempt.
- **Hashtags and emojis** unless the user explicitly added them.
- **Buzzwords and forced slang.**
- **Clichés** ("at the end of the day," "north star," "single source of truth" used as filler).
- **Self-congratulatory framing** ("thoughtful builders," "great teams," "mature engineers").

### 6. Final pass

Scan the prose against this list before reporting done:

- At most one em dash. Zero is better.
- No three-item rhetorical lists in a row. Mix in 2s, 4s, and 5s.
- No cringe transitions.
- No corporate gerunds.
- No semicolons in prose.
- Headings sound like a person, not a slide deck.
- The opening hook either admits something (Comeau), states a sharp claim (Dodds), or sets a scene (McCord). Not a generic "In today's world..."

## Frontmatter rules

Posts use this frontmatter shape (already established in the existing files):

```yaml
---
'@type': 'BlogPosting'
'@id': 'https://lifeiscontent.net/blog-postings/<slug>'
url: 'https://lifeiscontent.net/blog-postings/<slug>'
mainEntityOfPage:
  '@type': 'WebPage'
  '@id': 'https://lifeiscontent.net/blog-postings/<slug>'
isPartOf:
  '@type': 'Blog'
  '@id': 'https://lifeiscontent.net/blog-postings'
  name: 'lifeiscontent.net Blog'
headline: '<title>'
description: '<one or two sentences, written in the voice above>'
abstract: '<one or two sentences, written in the voice above>'
datePublished: 'YYYY-MM-DD'
dateModified: 'YYYY-MM-DD'
inLanguage: 'en-US'
author:
  - lifeiscontent
keywords:
  - <kebab-case>
---
```

`description` and `abstract` are reader-facing and follow the same rules as the body. They should not read like SEO copy.

Update `dateModified` to today when rewriting an existing post. Leave `datePublished` alone.

## Code blocks

- Never alter code inside fenced blocks. Treat them as load-bearing.
- The line that introduces a code block should give the reader a reason to read it: what the code does, what to look for, or what's about to surprise them. Not "Here's the code:".
- After a code block, write one or two sentences that highlight the key idea. Do not narrate every line.

## Headings

- Sentence case, not title case. ("How to wire up Phoenix" not "How To Wire Up Phoenix.")
- Verbs and concrete nouns. Avoid abstract themes ("The Journey Forward").
- A subhead should answer "what's the next thing the reader needs?"

## Quick reference: rewriting an existing post

1. Read the current file. Note frontmatter, all code blocks, all internal anchor links.
2. List facts, numbers, and links you must preserve.
3. Rewrite prose section by section. Keep code blocks character-for-character identical.
4. Update `description`, `abstract`, and `dateModified` in the frontmatter.
5. Run the final-pass checklist. Grep for `;` and `—` in your output to be sure.
6. Report what changed and what you preserved.
