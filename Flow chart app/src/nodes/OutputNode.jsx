import React from 'react';
import BaseNode from './BaseNode';

const OutputNode = ({ data = {}, selected }) => {
  return (
    <BaseNode
      data={{
        label: 'Output',
        content: 'Data output destination',
        ...data
      }}
      selected={selected}
      type="output"
      icon="📤"
      handles={{
        inputs: [{ id: 'input', position: 50 }],
        outputs: []
      }}
    />
  );
};

export default OutputNode;