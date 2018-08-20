import React from 'react';
import PropTypes from 'prop-types';

class Steps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0
    };
  }

  render() {
    return this.props.children[this.state.step];
  }
}

Steps.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default Steps;
