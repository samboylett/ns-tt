import React from 'react'; // eslint-disable-line no-unused-vars

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

export default FileInput;
