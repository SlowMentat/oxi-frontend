import React from 'react';
import PropTypes from 'prop-types';

//CSS Styles

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js',
//import EditIcon from '../SvgAssets/Icons/EditIcon.js',
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CommentsStyle from '../../comments.scss';

const testComment = "";

class Comments extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {
			comments
		} = this.props;

		return(
			<div className={CommentsStyle.commentsContainer_div}>
				<div>
					<div className={CommentsStyle.textArea_div}>
						<label for="comment">Comment</label>
						<textarea id="comment" name="comment" rows="11" cols="48" style={{width:'100%'}}></textarea>
					</div>
					<div className={CommentsStyle.comments_div}>
						{
							comments.map(comment => 
								<div className={CommentsStyle.comment_div}>
									<div className={CommentsStyle.commentText_div}>
										{ comment }
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Comments;