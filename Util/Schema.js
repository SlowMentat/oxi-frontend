import {schema} from 'normalizr';

export const item = new schema.Entity('items',{}, {idAttribute: 'id'});
export const content = new schema.Entity('contents', {items: [item]}, {idAttribute: 'id'});
export const outfit = new schema.Entity('outfits', {contents: [content]}, {idAttribute: 'id'});
export const outfitsSchema = new schema.Array(outfit);
export const profileSchema = new schema.Entity('profile', {}, {idAttribute: 'id'});