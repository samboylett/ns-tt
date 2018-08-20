import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/App';
import CVForm from '../src/CVForm';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  let component;

  beforeEach(() => {
    component = shallow((
      <App />
    ));
  });

  it('renders without crashing', () => {
    expect(component).toBeDefined();
  });

  it('renders a CVForm', () => {
    expect(component.find(CVForm)).toHaveLength(1);
  });
});
