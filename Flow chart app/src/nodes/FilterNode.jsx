import React from 'react';
import BaseNode from './BaseNode';

const FilterNode = ({ data = {}, selected }) => {
  return (
    <BaseNode
      data={{
        label: 'Filter',
        content: 'Filter data based on conditions',
        ...data
      }}
      selected={selected}
      type="filter"
      icon="🔍"
      handles={{
        inputs: [{ id: 'input', position: 50 }],
        outputs: [{ id: 'output', position: 50 }]
      }}
    />
  );
};

export default FilterNode;


