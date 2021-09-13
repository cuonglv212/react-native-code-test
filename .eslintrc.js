module.exports = {
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint",
		"react-hooks",
		"react-native",
		"import"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"no-unused-vars": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-empty-function": 0,
		"react/prop-types": 0,
		"react/display-name": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		"import/order": [
			2,
			{
				"groups": ["builtin", "external", "internal"],
				"pathGroups": [
					{
						"pattern": "react",
						"group": "external",
						"position": "before"
					}
				],
				"pathGroupsExcludedImportTypes": ["react"],
				"newlines-between": "always",
				"alphabetize": {
					"order": "asc",
					"caseInsensitive": true
				}
			}
		]
	}
};
