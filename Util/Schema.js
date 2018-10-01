import {schema} from 'normalizr';

//Schemas used by normalizr

export const item = new schema.Entity('items',{}, {idAttribute: 'id'});
export const content = new schema.Entity('contents', {items: [item]}, {idAttribute: 'id'});
export const outfit = new schema.Entity('outfits', {contents: [content]}, {idAttribute: 'id'});
//export const outfitSchema = new schema.Entity(outfit);
export const outfitsSchema = new schema.Array(outfit);
export const profileSchema = new schema.Entity('profile', {}, {idAttribute: 'id'});

export const contents = new schema.Array(content);
export const items = new schema.Array(item);

//helper function to denormalize outfit and associated child entities from addEntitiesReducer branch of application state
//@param {outfit} 	normalized outfit entity.  There shoul only be one.  
//@param {contents}	normalized array of contents associated with outfit,
//@param {items}	normalized array of items associated to each content.
export function denormalizeOutfit(outfit, contents, items){
	let denormContents = [];
	//Build denormalized contents object array
	console.log('contents = ', contents)
	console.log('Object.values(contents) = ', Object.values(contents))
	for(let content of Object.values(contents)){
		let denormItems = [];
		//Build denormalized items object array
		for(let itemId of content.items){
			denormItems = [...denormItems, items[itemId]]
		}
		console.log('content = ', content)
		console.log('denormalized items = ', denormItems)
		denormContents = [...denormContents, Object.assign(content, {items: denormItems})]
	}
	console.log('denormalized contents = ', denormContents)
	//build denormalized outfit object
	return Object.assign({}, outfit['1'], {contents: denormContents});
}