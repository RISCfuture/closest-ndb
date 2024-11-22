import { describe, expect, it } from 'vitest'
import ADFView from '../ADFView.vue'
import { render } from 'vitest-browser-vue'
import { page } from '@vitest/browser/context'

describe('ADFView', () => {
  describe('with known bearing', () => {
    it.skip('sets the pointer rotation', () => {
      render(ADFView, {
        props: {
          bearing: 90
        }
      })
      const pointer = page.getByTestId('pointer').element() as SVGPathElement
      expect(pointer.style.rotate).toEqual('90deg')
    })
  })

  describe('with unknown bearing', () => {
    it.skip('spins the pointer', () => {
      render(ADFView)
      const pointer = page.getByTestId('pointer').element() as SVGPathElement
      expect(pointer.style.rotate).toEqual('0deg')
    })
  })
})
