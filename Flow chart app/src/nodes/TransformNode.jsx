import React, { useState } from 'react';
import BaseNode from './BaseNode';

const TransformNode = ({ data = {}, selected, id }) => {
  const [transform, setTransform] = useState(data?.transform || 'uppercase');
  
  const handleTransformChange = (e) => {
    setTransform(e.target.value);
  };

  const customHandles = {
    inputs: [
      { id: 'input', position: 50 }
    ],
    outputs: [
      { id: 'output', position: 50 }
    ]
  };

  return (
    <BaseNode
      data={{
        ...data,
        label: 'Transform',
        content: (
          <div style={{ padding: '8px' }}>
            <select
              value={transform}
              onChange={handleTransformChange}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px',
                background: 'white'
              }}
            >
              <option value="uppercase">UPPERCASE</option>
              <option value="lowercase">lowercase</option>
              <option value="capitalize">Capitalize</option>
              <option value="reverse">Reverse</option>
              <option value="trim">Trim Spaces</option>
            </select>
          </div>
        )
      }}
      selected={selected}
      type="transform"
      icon="🔄"
      handles={customHandles}
      id={id}
    />
  );
};

export default TransformNode;