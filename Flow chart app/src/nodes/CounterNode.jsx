import React, { useState } from 'react';
import BaseNode from './BaseNode';

const CounterNode = ({ data = {}, selected, id }) => {
  const [count, setCount] = useState(0);

  const handleCountChange = (e) => {
    const value = e.target.value;
    
    if (value === '' || /^-?\d*$/.test(value)) {
      setCount(value === '' ? 0 : parseInt(value) || 0);
    }
  };

  const customHandles = {
    inputs: [
      { id: 'input-increment', position: 25 },
      { id: 'input-reset', position: 75 }
    ],
    outputs: [
      { id: 'output-count', position: 50 }
    ]
  };

  return (
    <BaseNode
      data={{
        ...data,
        label: 'Counter',
        content: (
          <div style={{ padding: '8px' }}>
            <input
              type="text"
              value={count}
              onChange={handleCountChange}
              placeholder="Initial count"
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
            <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
              Current: {count}
            </div>
          </div>
        )
      }}
      selected={selected}
      type="counter"
      icon="🔢"
      handles={customHandles}
      id={id}
    />
  );
};

export default CounterNode;