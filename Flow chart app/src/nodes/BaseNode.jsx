import React from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

const BaseNode = ({
  data = {},
  selected,
  type = 'default',
  icon = '○',
  handles = { inputs: [], outputs: [] }, 
  id
}) => {
  const nodeClass = `base-node node-type-${type} ${selected ? 'selected' : ''}`;

  const nodeHandles = handles;

  const safeData = {
    label: data?.label || type.charAt(0).toUpperCase() + type.slice(1),
    content: data?.content || `This is a ${type} node`,
    ...data
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const nodeIdToDelete = id || data.nodeId;
    if (data.onDelete && nodeIdToDelete) {
      data.onDelete(nodeIdToDelete);
    }
  };

  return (
    <div className={nodeClass}>
      {/* Delete Button - Only show when node is selected */}
      {selected && (
        <button className="node-delete-btn" onClick={handleDelete} title="Delete node">
          ×
        </button>
      )}

      {/* Input Handles (targets) */}
      {nodeHandles.inputs.map((handle, index) => (
        <Handle
          key={`input-${handle.id || index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `input-${index}`}
          isConnectable={true}
          style={{
            top: `${handle.position || (index + 1) * 25}%`,
            background: handle.color || '#3b82f6'
          }}
          className="base-node-handle base-node-handle-left"
        />
      ))}

      {/* Node Header */}
      <div className="base-node-header">
        <div className="base-node-icon">
          {icon}
        </div>
        <div className="base-node-title">
          {safeData.label}
        </div>
      </div>

      {/* Node Content */}
      <div className="base-node-content">
        {safeData.content}
      </div>

      {/* Output Handles (sources) */}
      {nodeHandles.outputs.map((handle, index) => (
        <Handle
          key={`output-${handle.id || index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `output-${index}`}
          isConnectable={true}
          style={{ 
            top: `${handle.position || (index + 1) * 25}%`,
            background: handle.color || '#3b82f6'
          }}
          className="base-node-handle base-node-handle-right"
        />
      ))}

    </div>
  );
};

export default BaseNode;


