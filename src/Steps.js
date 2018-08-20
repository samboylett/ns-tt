import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

/**
 * A multi-step form component
 */
class Steps extends React.Component {
  /**
   * Sets the current step to 0
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  /**
   * See if we're on the first step or not
   *
   * @returns {Boolean} True if first step, false otherwise
   */
  isFirstStep() {
    return this.state.step === 0;
  }

  /**
   * See if we're on the last step or not
   *
   * @returns {Boolean} True if last step, false otherwise
   */
  isLastStep() {
    return this.state.step === this.props.children.length - 1;
  }

  /**
   * Renders the `Previous` button if there is a previous step
   *
   * @returns {React.Node}
   */
  renderPreviousButton() {
    if (this.isFirstStep()) {
      return null;
    }

    return (
      <Button onClick={() => this.setState({ step: this.state.step - 1 })}>Previous</Button>
    );
  }

  /**
   * Renders the component
   *
   * @returns {React.Node}
   */
  render() {
    return (
      <Form
        onSubmit={this.isLastStep()
          ? this.props.onSubmit
          : () => this.setState({ step: this.state.step + 1 })}
      >
        {this.props.children[this.state.step]}
        {this.renderPreviousButton()}
        <Button
          type="submit"
          className="pull-right"
        >{this.isLastStep() ? 'Submit' : 'Next'}</Button>
      </Form>
    );
  }
}

Steps.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Steps;
