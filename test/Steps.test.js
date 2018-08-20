import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import Steps from '../src/Steps';

Enzyme.configure({ adapter: new Adapter() });

describe('Steps', () => {
  let component;
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();

    component = mount((
      <Steps onSubmit={onSubmit}>
        <p>Foo</p>
        <p>Bar</p>
      </Steps>
    ));
  });

  it('renders without crashing', () => {
    expect(component).toBeDefined();
  });

  it('renders the first step', () => {
    expect(component.find('p')).toHaveText('Foo');
  });

  it('renders a next button', () => {
    expect(component.find('Button')).toHaveText('Next');
    expect(component.find('Button')).toHaveProp('type', 'submit');
  });

  describe('after clicking the next button', () => {
    beforeEach(() => {
      component.find('Button').simulate('submit');
      component.update();
    });

    it('renders the second step', () => {
      expect(component.find('p')).toHaveText('Bar');
    });

    it('renders a previous button', () => {
      expect(component.find('Button').at(0)).toHaveText('Previous');
      expect(component.find('Button').at(0)).not.toHaveProp('type', 'submit');
    });

    it('renders a submit button', () => {
      expect(component.find('Button').at(1)).toHaveText('Submit');
      expect(component.find('Button').at(1)).toHaveProp('type', 'submit');
    });

    describe('after clicking the submit button', () => {
      beforeEach(() => {
        expect(onSubmit).not.toHaveBeenCalled();
        component.find('Button').at(1).simulate('submit');
      });

      it('calls onSubmit callback', () => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });

    describe('after clicking previous button', () => {
      beforeEach(() => {
        component.find('Button').at(0).simulate('click');
        component.update();
      });

      it('renders the first step', () => {
        expect(component.find('p')).toHaveText('Foo');
      });

      it('renders a next button', () => {
        expect(component.find('Button')).toHaveText('Next');
        expect(component.find('Button')).toHaveProp('type', 'submit');
      });
    });
  });
});
