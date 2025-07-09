import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ScoreCell from '../../../src/components/team/TeamScoreInput.vue'

describe('TeamScoreInput.vue', () => {
    const team = { score: 5 }

    it('renders team score', () => {
        const wrapper = mount(ScoreCell, {
            props: {
                team,
                teamPosition: 'top',
                canEditScore: false,
                isFirstTeam: false,
            },
        })
        expect(wrapper.text()).toContain('5')
    })

    it('renders input when canEditScore and clicked', async () => {
        const wrapper = mount(ScoreCell, {
            props: {
                team,
                teamPosition: 'top',
                canEditScore: true,
                isFirstTeam: false,
            },
        })

        await wrapper.trigger('click')
        expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    })

    it('emits update:score on input change', async () => {
        const wrapper = mount(ScoreCell, {
            props: {
                team,
                teamPosition: 'top',
                canEditScore: true,
                isFirstTeam: false,
            },
        })

        await wrapper.trigger('click')

        const input = wrapper.find('input')
        await input.setValue('10')
        await input.trigger('change')

        expect(wrapper.emitted('update:score')).toBeTruthy()
        expect(wrapper.emitted('update:score')[0]).toEqual([
            { position: 'top', score: 10 },
        ])
    })

    it('applies border if isFirstTeam is true', () => {
        const wrapper = mount(ScoreCell, {
            props: {
                team,
                teamPosition: 'top',
                canEditScore: false,
                isFirstTeam: true,
            },
        })

        expect(wrapper.classes()).toContain('border-b')
    })

    it('reactively updates score when props.team changes', async () => {
        const wrapper = mount(ScoreCell, {
            props: {
                team: { score: 3 },
                teamPosition: 'top',
                canEditScore: false,
                isFirstTeam: false,
            },
        })

        expect(wrapper.text()).toContain('3')

        await wrapper.setProps({ team: { score: 7 } })
        expect(wrapper.text()).toContain('7')
    })
})
