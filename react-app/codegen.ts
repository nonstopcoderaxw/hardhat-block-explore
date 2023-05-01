import { CodegenConfig } from '@graphql-codegen/cli'
 
export const config: CodegenConfig = {
  schema: 'http://localhost:4001/graphql',
  documents: ['./src/**/*.graphql'],
  generates: {
    './src/graphql/generated.ts': {
      plugins: [
        "typescript",
        "typescript-operations",
        "typed-document-node"
      ]
    }
  }
}
 
export default config