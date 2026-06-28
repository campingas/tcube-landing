import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  pollResults: defineTable({
    assistant: v.number(),
    play: v.number(),
    slug: v.string(),
    updatedAt: v.number(),
  }).index('by_slug', ['slug']),
})
