import React from 'react';
import BaseNode from './BaseNode';

const LLMNode = ({ data = {}, selected, id }) => {
  return (
    <BaseNode
      data={{
        label: 'LLM',
        content: 'Large Language Model processing',
        ...data
      }}
      selected={selected}
      type="LLM"
      icon="🤖"
      handles={{
        inputs: [
          { id: 'input', position: 30 }, 
          { id: 'prompt', position: 70 }
        ],
        outputs: [{ id: 'output', position: 50 }]
      }}
      id={id}
    />
  );
};

export default LLMNode;