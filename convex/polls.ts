import { mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'

const FEATURE_POLL_SLUG = 'feature-interest'
const initialCounts = {
  assistant: 0,
  play: 0,
}

export const getFeaturePoll = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const poll = await ctx.db
      .query('pollResults')
      .withIndex('by_slug', (q) => q.eq('slug', FEATURE_POLL_SLUG))
      .unique()

    if (poll === null) {
      return initialCounts
    }

    return {
      assistant: poll.assistant,
      play: poll.play,
    }
  },
})

export const submitFeatureVote = mutationGeneric({
  args: {
    choice: v.union(v.literal('play'), v.literal('assistant')),
  },
  handler: async (ctx, { choice }) => {
    const poll = await ctx.db
      .query('pollResults')
      .withIndex('by_slug', (q) => q.eq('slug', FEATURE_POLL_SLUG))
      .unique()

    const now = Date.now()

    if (poll === null) {
      const counts = {
        ...initialCounts,
        [choice]: 1,
      }

      await ctx.db.insert('pollResults', {
        ...counts,
        slug: FEATURE_POLL_SLUG,
        updatedAt: now,
      })

      return counts
    }

    const counts = {
      assistant: poll.assistant + (choice === 'assistant' ? 1 : 0),
      play: poll.play + (choice === 'play' ? 1 : 0),
    }

    await ctx.db.patch(poll._id, {
      ...counts,
      updatedAt: now,
    })

    return counts
  },
})
