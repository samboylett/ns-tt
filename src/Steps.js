import React from 'react';
import PropTypes from 'prop-types';

class Steps extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
  };

  state = {
    step: 0
  };

  render() {
    return this.props.children[this.state.step];
  }
}

export default Steps;
