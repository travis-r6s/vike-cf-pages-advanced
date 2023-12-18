import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'curly': ['error', 'multi-line'],
    'ts/no-namespace': 'off'
  },
  overrides: [
    {

      files: ['./apps/demo-app/**/*'],
      react: true,
    },
  ],
})
