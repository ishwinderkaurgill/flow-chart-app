import React from 'react';
import BaseNode from './BaseNode';

const InputNode = ({ data = {}, selected }) => {
  return (
    <BaseNode
      data={{
        label: 'Input',
        content: 'Data input source',
        ...data
      }}
      selected={selected}
      type="input"
      icon="📥"
      handles={{
        inputs: [],
        outputs: [{ id: 'output', position: 50 }]
      }}
    />
  );
};

export default InputNode;


