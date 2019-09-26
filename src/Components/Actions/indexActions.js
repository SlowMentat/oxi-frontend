
//Do this in every file where you use `fetch`
import fetch from 'cross-fetch'
import axios from 'axios';
import Cookies from 'universal-cookie';
import qs from 'qs';

import {normalize, denormalize} from 'normalizr';
import {outfitsSchema, profileSchema, contents, items, likeCountSchema, contentWithOutfitSchema, contentWithOutfits} from '../../Util/Schema.js';
import {buildItemContentsObject} from '../../Util/Schema.js'

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import * as scaffolding from './Scaffolding.js';
import * as genericActions from './GenericActions.js';
import * as types from './Types.js';
import * as networkActions from './NetworkActions.js';

export * from './Scaffolding.js';
export * from './GenericActions.js';
export * from './Types.js';
export * from './NetworkActions.js';
export * from './EntityActions/Index.js';
export * from './CustomActions.js';
//export * from './AppActions.js';
//const FormData = require('form-data');

//import {FormData} from 'form-data';

