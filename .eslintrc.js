module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'testing-library/no-container': 0,
    'testing-library/no-node-access': 0,
    'no-console': 1,
  },
}
