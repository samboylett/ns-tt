import React, { Component } from 'react';
import { Container, Message, Checkbox, TextArea } from 'semantic-ui-react';
import './App.css';
import Steps from './Steps';
import FileInput from './FileInput';
import FormFieldErrorable from './FormFieldErrorable';

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
      errors: {},
      loading: false,
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
        errors: {
          ...this.state.errors,
          [fieldName]: undefined
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
        errors: {
          ...this.state.errors,
          [fieldName]: undefined
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
        errors: {
          ...this.state.errors,
          [fieldName]: undefined
        },
      });
    }
  }

  /**
   * Handles submitting the form
   */
  handleSubmit() {
    const data = new FormData();
    const { fields } = this.state;

    this.setState({ loading: true });

    Object.keys(fields).forEach(key => {
      if (FILE_FIELDS.includes(key)) {
        if (fields[key] && fields[key][0]) {
          data.append(key, fields[key][0]);
        }
      } else {
        data.append(key, fields[key]);
      }
    });

    fetch(SUBMISSIONS_URL, {
      method: 'POST',
      body: data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(response => {
        switch (response.status) {
          case 422: {
            return response.json().then(({ message, errors }) => {
              this.setState({ errors });
            });
          }
          default: {
            console.log('default', response);
          }
        }
      })
      .catch(() => {})
      .then(() => {
        this.setState({ loading: false });
      });
  }

  /**
   * Renders the app
   *
   * @returns {React.Node}
   */
  render() {
    const errorCount =
      Object.keys(this.state.errors)
        .filter(key => this.state.errors[key])
        .length;

    return (
      <React.Fragment>
        <header className="App-header">
          <h1>Submit your CV</h1>
        </header>
        <Container>
          {Boolean(errorCount) && (
            <Message
              negative
              content={`${errorCount} errors need resolving`}
            />
          )}
          <Steps
            onSubmit={() => this.handleSubmit()}
            loading={this.state.loading}
          >
            <React.Fragment>
              <FormFieldErrorable error={this.state.errors.first_name}>
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  value={this.state.fields.first_name}
                  onChange={this.getOnChange('first_name')}
                  required
                />
              </FormFieldErrorable>
              <FormFieldErrorable error={this.state.errors.last_name}>
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  value={this.state.fields.last_name}
                  onChange={this.getOnChange('last_name')}
                />
              </FormFieldErrorable>
              <FormFieldErrorable error={this.state.errors.email}>
                <label>Email</label>
                <input
                  placeholder="Email"
                  value={this.state.fields.email}
                  onChange={this.getOnChange('email')}
                  type="email"
                  required
                />
              </FormFieldErrorable>
              <FormFieldErrorable error={this.state.errors.phone_number}>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  value={this.state.fields.phone_number}
                  onChange={this.getOnChange('phone_number')}
                  required
                />
              </FormFieldErrorable>
              <FormFieldErrorable error={this.state.errors.live_in_uk}>
                <label>Do you live in the UK?</label>
                <Checkbox
                  checked={this.state.fields.live_in_uk}
                  onChange={this.getOnChangeCheckbox('live_in_uk')}
                />
              </FormFieldErrorable>
              <FormFieldErrorable error={this.state.errors.git_profile}>
                <label>Git Profile</label>
                <input
                  placeholder="Git Profile"
                  value={this.state.fields.git_profile}
                  onChange={this.getOnChange('git_profile')}
                  required
                />
              </FormFieldErrorable>
            </React.Fragment>
            <React.Fragment>
              <FormFieldErrorable error={this.state.errors.cv}>
                <label>CV</label>
                <FileInput
                  value={this.state.fields.cv}
                  onChange={this.getOnChangeFile('cv')}
                  required
                />
              </FormFieldErrorable>
              <FormFieldErrorable error={this.state.errors.cover_letter}>
                <label>Cover Letter</label>
                <FileInput
                  value={this.state.fields.cover_letter}
                  onChange={this.getOnChangeFile('cover_letter')}
                />
              </FormFieldErrorable>
            </React.Fragment>
            <React.Fragment>
              <FormFieldErrorable error={this.state.errors.about_you}>
                <label>About You</label>
                <TextArea
                  required
                  onChange={this.getOnChange('about_you')}
                  value={this.state.fields.about_you}
                />
              </FormFieldErrorable>
            </React.Fragment>
          </Steps>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
