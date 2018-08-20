import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Segment } from 'semantic-ui-react';

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
   * Renders a step as visible if its the current step, otherwise hides it using CSS
   * Called using React.Children.map so we don't need to worry about keys
   *
   * @param {React.Node} step
   * @param {number} index
   * @returns {React.Node}
   */
  renderStep(step, index) {
    return (
      <Segment className={index !== this.state.step && 'hide'}>
        {step}
      </Segment>
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
        {React.Children.map(this.props.children, this.renderStep.bind(this))}
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
