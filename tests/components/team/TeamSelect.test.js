import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TeamSelect from '../../../src/components/team/TeamSelect.vue'
import { PERMISSIONS } from '../../../src/constants/tournament'

const availableTeams = [
    { id: 1, name: 'Team A', logo: 'logo-a.png' },
    { id: 2, name: 'Team B', logo: 'logo-b.png' },
    { id: 3, name: 'TBD', logo: null },
]

const factory = (props = {}) => {
    return mount(TeamSelect, {
        props: {
            team: { id: 1, name: 'Team A', logo: 'logo-a.png' },
            teamPosition: 'top',
            availableTeams,
            selectedTeams: ['Team B'],
            canEdit: true,
            highlightedTeam: null,
            permissions: { [PERMISSIONS.CAN_SELECT_TEAM]: true },
            isWinner: false,
            isLoser: false,
            shouldHighlight: false,
            ...props,
        },
    })
}
describe('TeamSelect.vue', () => {
    it('renders team name in view mode', () => {
        const wrapper = factory({ canEdit: false })
        expect(wrapper.text()).toContain('Team A')
    })

    it('renders team logo if available', () => {
        const wrapper = factory({ canEdit: false })
        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('logo-a.png')
    })

    it('shows select input when canEdit is true and permission granted', () => {
        const wrapper = factory()
        expect(wrapper.find('select').exists()).toBe(true)
    })


    it('highlights team on mouseenter if not TBD', async () => {
        const wrapper = factory()
        await wrapper.trigger('mouseenter')

        expect(wrapper.emitted('highlight-team')).toBeTruthy()
        expect(wrapper.emitted('highlight-team')[0][0]).toBe('Team A')
    })

    it('does not emit highlight-team if team is TBD', async () => {
        const wrapper = factory({
            team: { name: 'TBD', id: null, logo: null },
        })
        await wrapper.trigger('mouseenter')
        expect(wrapper.emitted('highlight-team')).toBeFalsy()
    })

    it('emits unhighlight-team on mouseleave', async () => {
        const wrapper = factory()
        await wrapper.trigger('mouseleave')
        expect(wrapper.emitted('unhighlight-team')).toBeTruthy()
    })
})