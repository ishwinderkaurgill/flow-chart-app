import React from 'react';
import BaseNode from './BaseNode';

const APIRequestNode = ({ data = {}, selected }) => {
  return (
    <BaseNode
      data={{
        label: 'API Request',
        content: 'Make HTTP API requests',
        ...data
      }}
      selected={selected}
      type="api"
      icon="🌐"
      handles={{
        inputs: [{ id: 'input', position: 50 }],
        outputs: [{ id: 'output', position: 50 }]
      }}
    />
  );
};

export default APIRequestNode;
