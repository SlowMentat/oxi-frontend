import {schema} from 'normalizr';
import {OxiAppConstants} from './OxiAppConstants.js';
//Schemas used by normalizr

export const item = new schema.Entity(OxiAppConstants.JsonPropertyNames.ITEM, {}, {idAttribute : 'id'});

export const picture = new schema.Entity(OxiAppConstants.JsonPropertyNames.PICTURE, {}, {idAttribute : 'id'});

export const content = new schema.Entity(OxiAppConstants.JsonPropertyNames.CONTENT, {
	[OxiAppConstants.JsonPropertyNames.ITEM] : [item], 
	[OxiAppConstants.JsonPropertyNames.PICTURE] : picture
}, {idAttribute : 'id'});

export const outfit = new schema.Entity(OxiAppConstants.JsonPropertyNames.OUTFIT, {
	[OxiAppConstants.JsonPropertyNames.CONTENT] : [content]
}, {idAttribute : 'id'});

//export const outfitSchema = new schema.Entity(outfit);
export const outfitsSchema = new schema.Array(outfit);

export const profileSchema = new schema.Entity(OxiAppConstants.JsonPropertyNames.PROFILE, {}, {idAttribute : 'id'});

export const contents = new schema.Array(content);

export const items = new schema.Array(item);



//helper function to denormalize outfit and associated child entities from addEntitiesReducer branch of application state
//@param {outfits} 	normalized outfits entity.  There shoul only be one.  
//@param {contents}	normalized array of contents associated with outfit,
//@param {items}	normalized array of items associated to each content.
export function denormalizeOutfit(outfitsOrig, contentsOrig, itemsOrig){
	let denormContents = [];
	let outfits = Object.assign({}, outfitsOrig);
	let contents = Object.assign({}, contentsOrig);
	let items = Object.assign({}, itemsOrig);
	//Build denormalized contents object array
	console.log('contents = ', contents)
	console.log('Object.values(contents) = ', Object.values(contents))
	for(let content of [...Object.values(contents)] ){
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
export function buildItemContentsObject(rootEntityType, jsonEntity, currentCount=0){ 
	//Manually build itemContents join table
	let itemContents = {};
	const joinItemContent = (itemsJson, contentId) => {
		let result = {};
		//If joinItemContent is called to replace all itemContents currently in entitiesReducer, then currentCount should equal 0.
		//If joinItemContnet is called to append to the existing itemContents in entitiesReducer, then currentCoutn is set to the count of entitiesReducer.itmeContents
		//let nextId = currentCount;
		for(let item of itemsJson){
			console.log("currentCount = ", currentCount);
			if(item != null && item != undefined){
				result[currentCount] = {
					id: currentCount, 
					itemId: item.id, 
					contentId: contentId
				};
				currentCount++;
			}
		}
		return result;	
	};
	switch(rootEntityType){
		case OxiAppConstants.JsonPropertyNames.OUTFIT:
			//returned a single outfit entitiy 
			if(jsonEntity.length === undefined){	
				for(let content of jsonEntity.contents){
					if(content != null && content != undefined){
						itemContents = Object.assign({}, itemContents, joinItemContent(content.items, content.id));
					}
				}
			}
			//returned array of outfit entites
			else{
				for(let outfit of jsonEntity){	//TODO:  not needed if jsonEntity contins one outfit
					for(let content of outfit.contents){
						if(content != null && content != undefined){
							itemContents = Object.assign({}, itemContents, joinItemContent(content.items, content.id));
						}
					}
				}
			}
			break;
		case OxiAppConstants.JsonPropertyNames.CONTENT:
			//returned a single content entitiy 
			if(jsonEntity.length === undefined){	
				if(jsonEntity !== null && jsonEntity !== undefined){
					itemContents = Object.assign({}, itemContents, joinItemContent(content.items, content.id));
				}
			}
			//returned array of content entities
			else{
				for(let content of jsonEntity){
					if(content != null && content != undefined){
						itemContents = Object.assign({}, itemContents, joinItemContent(content.items, content.id));
					}
				}
			}
			break;
		default:
			break;
	}
	/*for(let outfit of outfitsJson){
		let contents = (outfit === undefined) ? outfitsJson.contents : outfit.contents;		
		for(let contentJson of contents){
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
	}*/
	console.log('itemContents object = ', itemContents);
	return itemContents;
}