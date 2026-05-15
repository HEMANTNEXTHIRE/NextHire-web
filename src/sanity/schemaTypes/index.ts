import { type SchemaTypeDefinition } from 'sanity'
import post from '../postSchema'
import author from '../authorSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author],
}
