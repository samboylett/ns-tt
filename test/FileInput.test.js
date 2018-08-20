import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import FileInput from '../src/FileInput';

Enzyme.configure({ adapter: new Adapter() });

describe('FileInput', () => {
  let component;
  let onChange;

  beforeEach(() => {
    onChange = jest.fn();

    component = shallow((
      <FileInput
        onChange={onChange}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component).toBeDefined();
  });

  it('renders a file input', () => {
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('input')).toHaveProp('type', 'file');
  });

  describe('when input changes', () => {
    beforeEach(() => {
      component.find('input').simulate('change');
    });

    it('calls onChange callback', () => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('when value set', () => {
    beforeEach(() => {
      component.setProps({
        value: [{
          name: 'test.pdf'
        }]
      })
    });

    it('renders a text field with the file name', () => {
      expect(component.find('input').at(0)).toHaveProp('value', 'test.pdf');
    });

    it('renders an empty file field', () => {
      expect(component.find('input').at(1)).toHaveProp('type', 'file');
      expect(component.find('input').at(1)).not.toHaveProp('value');
    });
  });
});
