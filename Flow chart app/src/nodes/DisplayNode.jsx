import React from 'react';
import BaseNode from './BaseNode';

const DisplayNode = ({ data = {}, selected }) => {
  return (
    <BaseNode
      data={{
        label: 'Display',
        content: 'Display data or results',
        ...data
      }}
      selected={selected}
      type="display"
      icon="📊"
      handles={{
        inputs: [{ id: 'input', position: 50 }],
        outputs: [{ id: 'output', position: 50 }]
      }}
    />
  );
};

export default DisplayNode;