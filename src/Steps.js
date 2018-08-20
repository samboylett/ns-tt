import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Segment } from 'semantic-ui-react';

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

  renderStep(step, index) {
    return (
      <Segment className={index !== this.state.step && 'hide'}>
        {step}
      </Segment>
    );
  }

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
          onClick={() => this.setState({ step: this.state.step + 1 })}
          className="pull-right"
        >{this.isLastStep() ? 'Submit' : 'Next'}</Button>
      </Form>
    );
  }
}

Steps.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Steps;
