// @flow
/*global it expect jest*/

import BindFileDropListener, { swallowEvent } from './BindFileDropListener'

it('Should bind the listener on drop events', () => {
  const div = document.createElement('div')
  const listener = jest.fn()
  BindFileDropListener(listener)(div)

  const unrelatedEvent = new Event('unrelated')
  const dropEvent = new Event('drop')

  div.dispatchEvent(unrelatedEvent)
  div.dispatchEvent(dropEvent)

  expect(listener).toHaveBeenCalledTimes(1)
})

it('Should swallow events', () => {
  const myEvent = new class extends Event {
    constructor(name) {
      super(name)
    }
    preventDefault = jest.fn()
    stopPropagation = jest.fn()
  }('swallow_me')
  swallowEvent(myEvent)

  expect(myEvent.preventDefault).toHaveBeenCalledTimes(1)
  expect(myEvent.stopPropagation).toHaveBeenCalledTimes(1)
})
