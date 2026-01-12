import React, { useState } from 'react';
import BaseNode from './BaseNode';

const MergerNode = ({ data = {}, selected, id }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');
  
  const handleMergeTypeChange = (e) => {
    setMergeType(e.target.value);
  };

  const handleSeparatorChange = (e) => {
    setSeparator(e.target.value);
  };

  const customHandles = {
    inputs: [
      { id: 'input-1', position: 20 },
      { id: 'input-2', position: 40 },
      { id: 'input-3', position: 60 },
      { id: 'input-4', position: 80 }
    ],
    outputs: [
      { id: 'output', position: 50 }
    ]
  };

  return (
    <BaseNode
      data={{
        ...data,
        label: 'Merger',
        content: (
          <div style={{ padding: '8px' }}>
            <select
              value={mergeType}
              onChange={handleMergeTypeChange}
              style={{
                width: '100%',
                padding: '6px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px',
                background: 'white',
                marginBottom: '8px'
              }}
            >
              <option value="concat">Concatenate</option>
              <option value="sum">Sum Numbers</option>
              <option value="array">Create Array</option>
              <option value="object">Create Object</option>
            </select>
            
            {mergeType === 'concat' && (
              <input
                type="text"
                value={separator}
                onChange={handleSeparatorChange}
                placeholder="Separator (e.g., , or - or space)"
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
            )}
            
            <div style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
              {mergeType === 'concat' && `Joins with: "${separator}"`}
              {mergeType === 'sum' && 'Adds all input numbers'}
              {mergeType === 'array' && 'Creates array from inputs'}
              {mergeType === 'object' && 'Creates object from inputs'}
            </div>
          </div>
        )
      }}
      selected={selected}
      type="merger"
      icon="🔄"
      handles={customHandles}
      id={id}
    />
  );
};

export default MergerNode;