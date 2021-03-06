import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import components from './';
import {Card, Grid} from 'react-mdl';


/*
* Config provides information about how data is rendered
*  including which component is used, and what the
*  default style should be.
*
* Items includes information about the specific items to be displayed
*  (e.g. the text of a comment). This is passed to the item listed in config
*  as props.
*/
@connect(
  (state) => {
    return {
      config: state.playground.config.authorProfile,
      authors: state.playground.items.users,
      comments: state.playground.items.comments
    };
  },
  (dispatch) => {
    return {
      dispatch
    };
  }
)

/*
* Iterate through each component in config
* and pass it the appropriate props from getItem
*/
class AuthorProfileContainer extends Component {

  static propTypes = {
    commentId:PropTypes.string.isRequired
  }

  getItem() {
    let authorId = this.props.comments[this.props.commentId].user;
    return this.props.authors[authorId];
  }

  mapComponentFromConfig(config) {
    let Component = components[config.component];
    let props = {...config.configProps};
    if (config.propTypes) {
      config.propTypes.reduce((props, propType) => {
        props[propType] = this.getItem()[propType];
        return props;
      },props);      
    }
    return <Component {...props} dispatch={this.props.dispatch} key={config.component} />;
  }

  sortConfig(a,b) {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
    return 0;
  }

  render() {
    const styles = this.props.styles || defaultStyle;
    let sortedConfig = this.props.config.sort(this.sortConfig);
    return <div>
      {
        this.props.comments[this.props.commentId].showProfile &&
        this.props.config.length > 0 &&
        <Card shadow={1} style={styles.profileCard}>
          <Grid style={styles.profileGrid}>
            {
              sortedConfig.map(this.mapComponentFromConfig.bind(this))
            }
          </Grid>
        </Card>        
      }
    </div>;
  }
}

export default AuthorProfileContainer;

const defaultStyle={
  profileCard:{
    minWidth:'90%',
    minHeight:100,
    margin:20
  },
  profileGrid:{
    width:'100%'
  }
};
