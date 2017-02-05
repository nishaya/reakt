import React from 'react'
import { shallow } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SliderControl from '../../../src/components/control/slider'

test('Slider contains label text', () => {
  const labelText = 'label text'
  const wrapper = shallow(<MuiThemeProvider>
    <SliderControl label={labelText} />
  </MuiThemeProvider>)
  const slider = wrapper.find(SliderControl).shallow()

  expect(slider.find('h3').length).toEqual(1)
  expect(slider.find('h3').text()).toEqual(labelText)
})
