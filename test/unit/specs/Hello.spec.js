import Vue from 'vue'
import Lead from '@/components/Lead'

describe('Lead.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Lead)
    const vm = new Constructor().$mount()
    expect(vm.$el.outerHTML).to.equal('<p class="Lead"></p>')
  })
})
