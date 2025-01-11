import React from 'react';

const Title = () => {
  return (
    <input
      type="text"
      placeholder="Enter Title"
      style={{
        flex: 1,
        padding: '10px',
        fontSize: '16px',
        marginRight: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow:' rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
      }}
    />
  );
};

export default Title;
