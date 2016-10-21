import React, { Component } from 'react';
import { getValidationRules, testValidationRules } from './validation-rules';

const Validator = (ComposedComponent) => {
	class ValidatorComponent extends Component {
		constructor(props) {
			super(props);
			this.state = {
				isValid: true,
				validationMessage: '',
				value: props.value || ''
			};
			this.validate = this.validate.bind(this);
			const { required, requiredMsg } = props;
			this.validationRules = getValidationRules({ required }, { required: requiredMsg });
		}

		shouldComponentUpdate(newProps, newState) {
			return this.state.isValid !== newState.isValid || this.state.value !== newState.value;
		}

		validate(e) {
			const validationResult = testValidationRules(this.validationRules, e.target.value);
			if (validationResult.isValid) {
				this.setState({ isValid: true, value: e.target.value });
			} else {
				this.setState({
					isValid: false,
					value: e.target.value,
					validationMessage: validationResult.message
				});
			}
		}

		render() {
			let error;
			if (!this.state.isValid) {
				error = <div className='error'>{ this.state.validationMessage }</div>;
			}
			return (
				<div>
					<ComposedComponent
						onBlur={ this.validate }
						onChange={ this.validate }
						value={ this.state.value }
					/>
					{ error }
				</div>
			);
		}
	}

	ValidatorComponent.propTypes = {
		value: React.PropTypes.string,
		required: React.PropTypes.oneOfType([
			React.PropTypes.bool,
			React.PropTypes.func
		]),
		requiredMsg: React.PropTypes.string
	};

	return ValidatorComponent;
};

export default Validator;
