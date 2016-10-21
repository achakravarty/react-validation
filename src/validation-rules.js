const REQUIRED_MSG = 'This is a required field';

const validationRules = {
	required: {
		test: value => value,
		message: REQUIRED_MSG
	}
};

const getValidationRules = (rules, messages) =>
	Object.keys(rules).map((key) => {
		if (typeof rules[key] === 'boolean') {
			return validationRules[key];
		} else if (typeof rules[key] === 'function') {
			return { test: rules[key], message: messages[key] || validationRules[key].message };
		}
		return null;
	})
	.filter(rule => rule);

const testValidationRules = (rules, value) => {
	const failingRule = rules.find(rule => !rule.test(value));
	if (failingRule) {
		return { isValid: false, message: failingRule.message };
	}
	return { isValid: true };
};

export { getValidationRules, testValidationRules };
