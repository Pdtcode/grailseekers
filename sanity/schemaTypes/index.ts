import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {dropPasswordType} from './dropPasswordType'
import dropSettingsType from './dropSettingsType'
import {productType} from './productType'
import {collectionType} from './collectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content types
    blockContentType, 
    postType,
    authorType,
    
    // Store types
    productType, 
    categoryType, 
    collectionType,
    
    // Utility types
    dropPasswordType,
    dropSettingsType,
  ],
}
