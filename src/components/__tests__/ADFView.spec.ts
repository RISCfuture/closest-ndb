import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ADFView from '../ADFView.vue'

describe('ADFView', () => {
  describe('with known bearing', () => {
    it.skip('sets the pointer rotation', () => {
      const wrapper = mount(ADFView, {
        props: {
          bearing: 90
        }
      })
      const pointer = wrapper.getCurrentComponent().refs.pointer as SVGPolygonElement
      expect(pointer.style.rotate).toEqual('90deg')
    })
  })

  describe('with unknown bearing', () => {
    it.skip('spins the pointer', () => {
      const wrapper = mount(ADFView)
      const pointer = wrapper.getCurrentComponent().refs.pointer as SVGPolygonElement
      expect(pointer.style.rotate).toEqual('0deg')
    })
  })
})
