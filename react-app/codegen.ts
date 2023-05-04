import { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv';
dotenv.config();

export const config: CodegenConfig = {
  schema: `${process.env.REACT_APP_GRAGHQL}/graphql`,
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