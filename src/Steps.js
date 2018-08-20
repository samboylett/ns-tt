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
   * Go to the previous step
   */
  previous() {
    this.setState({ step: this.state.step - 1 });
  }

  /**
   * Go to the next step
   */
  next() {
    this.setState({ step: this.state.step + 1 });
  }

  /**
   * Handles the submit action, either moves on to the next step
   * or submits the form
   */
  handleSubmit() {
    if (this.isLastStep()) {
      this.props.onSubmit();
    } else {
      this.next();
    }
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
      <Button type="button" onClick={() => this.previous()}>Previous</Button>
    );
  }

  /**
   * Renders the component
   *
   * @returns {React.Node}
   */
  render() {
    return (
      <Form onSubmit={() => this.handleSubmit()}>
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
