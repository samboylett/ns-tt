import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

/**
 * Renders a controlled file input
 *
 * @params {Object} props
 * @returns {React.Node}
 */
const FileInput = ({ value, onChange, ...props }) => {
  if (value && value.length) {
    return (
      <div className="file-input">
        <input
          key="text"
          value={Array.from(value).map(({ name }) => name).join(', ')}
          readOnly
          {...props}
        />
        <input
          key="file"
          type="file"
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <input
      key="file"
      type="file"
      onChange={onChange}
      {...props}
    />
  );
};

FileInput.propTypes = {
  value: PropTypes.instanceOf(FileList),
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
