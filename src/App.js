import React from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import CVForm from './CVForm';

/**
 * Renders the app chrome
 *
 * @returns {React.Node}
 */
const App = () => (
  <React.Fragment>
    <header className="App-header">
      <h1>Submit your CV</h1>
    </header>
    <Container>
      <CVForm />
    </Container>
  </React.Fragment>
);

export default App;
