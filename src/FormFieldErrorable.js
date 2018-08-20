import React from 'react'; // eslint-disable-line no-unused-vars
import { Form, Message } from 'semantic-ui-react';

/**
 * Renders a form field component with a possible error message
 *
 * @param {Object} props
 * @returns {React.Node}
 */
const FormFieldErrorable = ({ children, error }) => (
  <Form.Field error={Boolean(error)}>
    {children}
    {error && (
      <Message
        negative
        content={error}
      />
    )}
  </Form.Field>
);

export default FormFieldErrorable;
