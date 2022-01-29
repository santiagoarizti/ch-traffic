/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript/recommended"
    ],
    "env": {
        "vue/setup-compiler-macros": true
    },
    "rules": {
        "indent": ["warn", 4],
        "semi": ["error", "always"],
    },
    "overrides": [
        {
            "files": [
                "cypress/integration/**.spec.{js,ts,jsx,tsx}"
            ],
            "extends": [
                "plugin:cypress/recommended"
            ]
        }
    ]
};
