import React, { Component } from 'react';
import { Container, Form, Checkbox, TextArea } from 'semantic-ui-react';
import './App.css';
import Steps from './Steps';
import FileInput from './FileInput';

const SUBMISSIONS_URL = 'https://recruitment-submissions.netsells.co.uk/api/vacancies/javascript-developer/submissions';
const FILE_FIELDS = ['cv', 'cover_letter'];

/**
 * Renders a multi-step form to submit a CV
 */
class App extends Component {
  /**
   * Sets the initial state
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        live_in_uk: false,
        git_profile: '',
        cv: undefined,
        cover_letter: undefined,
        about_you: '',
      },
      errors: {}
    };
  }

  /**
   * Curry function to get an onChange handler
   *
   * @param {string} fieldName
   * @returns {Function} - onChange handler
   */
  getOnChange(fieldName) {
    return (event) => {
      this.setState({
        fields: {
          ...this.state.fields,
          [fieldName]: event.currentTarget.value,
        },
      });
    }
  }

  /**
   * Curry function to get an onChange handler for a checkbox
   *
   * @param {string} fieldName
   * @returns {Function} - onChange handler
   */
  getOnChangeCheckbox(fieldName) {
    return (event, data) => {
      this.setState({
        fields: {
          ...this.state.fields,
          [fieldName]: data.checked,
        },
      });
    }
  }

  /**
   * Curry function to get an onChange handler for a file input
   *
   * @param {string} fieldName
   * @returns {Function} - onChange handler
   */
  getOnChangeFile(fieldName) {
    return (event) => {
      this.setState({
        fields: {
          ...this.state.fields,
          [fieldName]: event.currentTarget.files,
        },
      });
    }
  }

  /**
   * Handles submitting the form
   */
  handleSubmit() {
    const data = new FormData();

    Object.keys(this.state).forEach(key => {
      if (FILE_FIELDS.includes(key)) {
        if (this.state[key] && this.state[key][0]) {
          data.append(key, this.state[key][0]);
        }
      } else {
        data.append(key, this.state[key]);
      }
    });

    fetch(SUBMISSIONS_URL, {
      method: 'POST',
      body: data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    }).then(response => {
      switch (response.status) {
        case 422: {
          response.json().then(message => {
            console.log('failed', message);
          });
          break;
        }
        default: {
          console.log('default', response);
        }
      }
    });
  }

  /**
   * Renders the app
   *
   * @returns {React.Node}
   */
  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <h1>Submit your CV</h1>
        </header>
        <Container>
          <Steps onSubmit={() => this.handleSubmit()}>
            <React.Fragment>
              <Form.Field>
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  value={this.state.fields.first_name}
                  onChange={this.getOnChange('first_name')}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  value={this.state.fields.last_name}
                  onChange={this.getOnChange('last_name')}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  value={this.state.fields.email}
                  onChange={this.getOnChange('email')}
                  type="email"
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  value={this.state.fields.phone_number}
                  onChange={this.getOnChange('phone_number')}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Do you live in the UK?</label>
                <Checkbox
                  checked={this.state.fields.live_in_uk}
                  onChange={this.getOnChangeCheckbox('live_in_uk')}
                />
              </Form.Field>
              <Form.Field>
                <label>Git Profile</label>
                <input
                  placeholder="Git Profile"
                  value={this.state.fields.git_profile}
                  onChange={this.getOnChange('git_profile')}
                  required
                />
              </Form.Field>
            </React.Fragment>
            <React.Fragment>
              <Form.Field>
                <label>CV</label>
                <FileInput
                  value={this.state.fields.cv}
                  onChange={this.getOnChangeFile('cv')}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Cover Letter</label>
                <FileInput
                  value={this.state.fields.cover_letter}
                  onChange={this.getOnChangeFile('cover_letter')}
                />
              </Form.Field>
            </React.Fragment>
            <React.Fragment>
              <Form.Field>
                <label>About You</label>
                <TextArea
                  required
                  onChange={this.getOnChange('about_you')}
                  value={this.state.fields.about_you}
                />
              </Form.Field>
            </React.Fragment>
          </Steps>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
