import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class Steps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0
    };
  }

  isFirstStep() {
    return this.state.step === 0;
  }

  isLastStep() {
    return this.state.step === this.props.children.length - 1;
  }

  renderPreviousButton() {
    if (this.isFirstStep()) return null;

    return (
      <Button onClick={() => this.setState({ step: this.state.step - 1 })}>Previous</Button>
    );
  }

  renderNextOrSubmit() {
    if (this.isLastStep()) return null;

    return (
      <Button
        onClick={() => this.setState({ step: this.state.step + 1 })}
        className="pull-right"
      >Next</Button>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children[this.state.step]}
        {this.renderPreviousButton()}
        {this.renderNextOrSubmit()}
      </React.Fragment>
    );
  }
}

Steps.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default Steps;
