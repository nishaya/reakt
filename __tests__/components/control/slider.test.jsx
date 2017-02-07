import React from 'react'
import { shallow } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SliderControl from '../../../src/components/control/slider'

const labelText = 'label text'
const wrapper = shallow(<MuiThemeProvider>
  <SliderControl label={labelText} />
</MuiThemeProvider>)
const slider = wrapper.find(SliderControl).shallow()

test('Slider contains label text', () => {
  expect(slider.find('h3').length).toEqual(1)
  expect(slider.find('h3').text()).toEqual(labelText)
})
