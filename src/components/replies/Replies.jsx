import React, {Component, PropTypes} from 'react';
import Authors from 'components/authors/AuthorContainer';
import Comments from 'components/comments/CommentContainer';
import Interactions from 'components/interactions/InteractionsContainer';
import Flag from 'components/flag/FlagContainer';
import CommentMenu from 'components/commentMenu/CommentMenuContainer';

class Replies extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.object.isRequired
  }

  render() {
    let replies = this.props.comments[this.props.id].replies;

    const styles = this.props.styles || defaultStyles;
    return <div>
      {
        replies && 
        replies.map((reply, i) => {
          return <div key={i}>
            {
              (this.props.showTrolls || !this.props.comments[reply].troll) &&
              <div className="replies" style={styles.replies} >
                <Authors commentId={reply} />
                <Flag id={reply}/>
                <CommentMenu id={reply}/>
                <Comments id={reply} />
                <Interactions id={reply} />
                <Replies
                  id={reply}
                  comments = {this.props.comments}/>
              </div>            
            }
          </div>;
        })
      }
    </div>;
  }
}

export default Replies;

const defaultStyles = {
  replies: {
    marginLeft:40,
    marginTop:20
  }
};
