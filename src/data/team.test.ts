import { describe, expect, it } from 'vitest'

import { getTeamMember, teamMembers } from './team'

describe('team data', () => {
  it('finds a member by slug', () => {
    expect(getTeamMember('mohamed')?.slug).toBe('mohamed')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getTeamMember('nobody')).toBeUndefined()
  })

  it('gives every experience entry a company and a role key', () => {
    for (const member of teamMembers) {
      expect(member.experience.length).toBeGreaterThan(0)
      for (const job of member.experience) {
        expect(job.company).not.toBe('')
        expect(job.roleKey).toMatch(new RegExp(`^${member.slug}\\.jobs\\.`))
      }
    }
  })

  it('gives every member at least one project and a YouTube link', () => {
    for (const member of teamMembers) {
      expect(member.projects.length).toBeGreaterThan(0)
      expect(member.socials.youtube).toMatch(/^https:\/\/www\.youtube\.com\//)
    }
  })
})
