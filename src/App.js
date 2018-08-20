import React, { Component } from 'react';
import { Container, Form, Checkbox } from 'semantic-ui-react';
import './App.css';
import Steps from './Steps';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      liveInUk: false,
      gitProfile: ''
    };
  }

  getOnChange(fieldName, checkbox = false) {
    return (event, data) => {
      this.setState({
        [fieldName]: checkbox
          ? data.checked
          : data.value
      });
    }
  }

  handleSubmit() {
    console.log('handleSubmit');
  }

  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <h1>Submit your CV</h1>
        </header>
        <Container>
          <Steps onSubmit={() => this.handleSubmit}>
            <React.Fragment>
              <Form.Field>
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.getOnChange('firstName')}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.getOnChange('lastName')}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.getOnChange('email')}
                  type="email"
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  value={this.state.phoneNumber}
                  onChange={this.getOnChange('phoneNumber')}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Do you live in the UK?</label>
                <Checkbox
                  checked={this.state.liveInUk}
                  onChange={this.getOnChange('liveInUk', true)}
                />
              </Form.Field>
              <Form.Field>
                <label>Git Profile</label>
                <input
                  placeholder="Git Profile"
                  value={this.state.gitProfile}
                  onChange={this.getOnChange('gitProfile')}
                  required
                />
              </Form.Field>
            </React.Fragment>
            <React.Fragment>
            </React.Fragment>
          </Steps>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
