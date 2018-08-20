import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { Message } from 'semantic-ui-react';
import FormFieldErrorable from '../src/FormFieldErrorable';

Enzyme.configure({ adapter: new Adapter() });

describe('FormFieldErrorable', () => {
  let component;

  beforeEach(() => {
    component = mount((
      <FormFieldErrorable>
        <p>foobar</p>
      </FormFieldErrorable>
    ));
  });

  it('renders without crashing', () => {
    expect(component).toBeDefined();
  });

  it('renders passed children', () => {
    expect(component.find('p')).toHaveLength(1);
    expect(component.find('p')).toHaveText('foobar');
  });

  it('does not render a Message', () => {
    expect(component.find(Message)).toHaveLength(0);
  });

  describe('when passed a truthy error prop', () => {
    beforeEach(() => {
      component.setProps({ error: 'fizzbuzz' });
    });

    it('renders a Message with the passed error', () => {
      expect(component.find(Message)).toHaveText('fizzbuzz');
    });
  });
});
