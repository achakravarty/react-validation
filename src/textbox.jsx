import React from 'react';
import Validator from './validator';

const TextBox = props => <input type='text' { ...props } />;

TextBox.propTypes = {
	onBlur: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	value: React.PropTypes.string.isRequired
};

export default Validator(TextBox);
