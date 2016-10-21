import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import TextBox from '../src/textbox';

describe('Specification: TextBox Validator', () => {
	it('should not show error if required input field is not empty', () => {
		const wrapper = mount(<TextBox required />);
		expect(wrapper.find('input')).to.have.length(1);
		expect(wrapper.find('div.error')).to.have.length(0);
		wrapper.find('input').simulate('change', { target: { value: 'abc' } });
		expect(wrapper.find('div.error')).to.have.length(0);
	});

	it('should show error if required input field is empty', () => {
		const wrapper = mount(<TextBox required />);
		expect(wrapper.find('input')).to.have.length(1);
		expect(wrapper.find('div.error')).to.have.length(0);
		wrapper.find('input').simulate('blur');
		expect(wrapper.find('div.error')).to.have.length(1);
		expect(wrapper.find('div.error').text()).to.equal('This is a required field');
	});

	it('should not show error if required input field with custom function is valid', () => {
		const wrapper = mount(
			<TextBox required={ value => /\d+/.test(value) } requiredMsg='Please enter a number' />
		);
		expect(wrapper.find('input')).to.have.length(1);
		expect(wrapper.find('div.error')).to.have.length(0);
		wrapper.find('input').simulate('change', { target: { value: '123' } });
		expect(wrapper.find('div.error')).to.have.length(0);
	});

	it('should show error if required input field with custom function is not valid', () => {
		const wrapper = mount(
			<TextBox required={ value => /\d+/.test(value) } requiredMsg='Please enter a number' />
		);
		expect(wrapper.find('input')).to.have.length(1);
		expect(wrapper.find('div.error')).to.have.length(0);
		wrapper.find('input').simulate('change', { target: { value: 'def' } });
		expect(wrapper.find('div.error')).to.have.length(1);
		expect(wrapper.find('div.error').text()).to.equal('Please enter a number');
	});
});
