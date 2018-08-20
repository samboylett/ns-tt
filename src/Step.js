import React from 'react';
import PropTypes from 'prop-types';

const Step = ({ children }) => (
  <React.Fragment>
    {children}
  </React.Fragment>
);

Step.propTypes = {
  children: PropTypes.node.isRequired
};

export default Step;
