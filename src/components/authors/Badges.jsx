import React, {Component, PropTypes} from 'react';
import CoralIcon from 'components/CoralIcon';
import {Tooltip,Icon} from 'react-mdl';

class Badges extends Component {

  static propTypes = {
    badges:PropTypes.array.isRequired
  }

  getIcon(name) {
    switch (name) {
    case 'author':
      return 'perm_identity';
     case 'favorite':
      return 'star';
    case 'liked':
      return 'thumb up';
    case 'moderator':
      return 'local_library';
    case 'poweruser':
      return 'flash on';
    case '3_yr':
      return 'filter_3';
    case '1_yr':
      return 'filter_1';
    case 'mentor':
      return 'group';
    case 'staff':
      return 'verified_user';
    }
  }

  render() {
    const styles = this.props.styles || defaultStyles;

    return <div style = {styles.badges}>
      {
        this.props.badges.map((badge) => {
          let iconStyle = Object.assign({}, styles.badgeIcon, {color:badge.color});
          return <Tooltip label={badge.name} key={badge.name}> 
            <Icon style={iconStyle} name={this.getIcon(badge.icon)}/>
          </Tooltip>;
        })
      }
    </div>;
  }
}

export default Badges;

const defaultStyles = {
  badges:{
    display: 'inline-block',
    marginLeft:10,
    cursor:'default'
  },
  badgeIcon: {
    fontSize:18,
    paddingRight: 5
  }
};
