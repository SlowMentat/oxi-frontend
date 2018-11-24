import {schema} from 'normalizr';

//Schemas used by normalizr

export const item = new schema.Entity('items',{}, {idAttribute: 'id'});
export const picture = new schema.Entity('picture', {}, {idAttribute: 'id'});
export const content = new schema.Entity('contents', {items: [item], 'picture':picture}, {idAttribute: 'id'});
export const outfit = new schema.Entity('outfits', {contents: [content]}, {idAttribute: 'id'});
//export const outfitSchema = new schema.Entity(outfit);
export const outfitsSchema = new schema.Array(outfit);
export const profileSchema = new schema.Entity('profile', {}, {idAttribute: 'id'});

export const contents = new schema.Array(content);
export const items = new schema.Array(item);

//helper function to denormalize outfit and associated child entities from addEntitiesReducer branch of application state
//@param {outfits} 	normalized outfits entity.  There shoul only be one.  
//@param {contents}	normalized array of contents associated with outfit,
//@param {items}	normalized array of items associated to each content.
export function denormalizeOutfit(outfits, contents, items){
	let denormContents = [];
	//Build denormalized contents object array
	console.log('contents = ', contents)
	console.log('Object.values(contents) = ', Object.values(contents))
	for(let content of Object.values(contents)){
		let denormItems = [];
		//Build denormalized items object array
		console.log('denormalizeOutfit:  items = ', items);
		for(let itemId of content.items){
			console.log('denormalizeOutfit:  itemId = ', itemId);
			denormItems = [...denormItems, items[itemId]]
		}
		console.log('content = ', content)
		console.log('denormalized items = ', denormItems)
		denormContents = [...denormContents, Object.assign(content, {items: denormItems})]
	}
	console.log('denormalized contents = ', denormContents)
	//build denormalized outfit object
	return Object.assign({}, outfits[Object.keys(outfits)[0]], {contents: denormContents});
}

//helper function to build and return itemContent json object
//@param {[outfit]} Array of denormalized outfit json object
export function buildItemContentsObject(outfitsJson){ 
	//Manually build itemContents join table
	let itemContents = {};
	let nextId = 0;
	for(let outfit of outfitsJson){
		for(let contentJson of outfit.contents){
			if(contentJson != null && contentJson != undefined){
				for(let itemJson of contentJson.items){
					if(itemJson != null && itemJson != undefined){
						itemContents[nextId] = {
							id: nextId, 
							itemId: itemJson.id, 
							contentId: contentJson.id
						};
						nextId++;
					}
				}
			}
		}
	}
	console.log('itemContents object = ', itemContents);
	return itemContents;
}