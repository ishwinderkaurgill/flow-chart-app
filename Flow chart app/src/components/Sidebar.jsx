import React from 'react';
import './Sidebar.css';

const nodeTypes = [
  {
    type: 'input',
    label: 'Input',
    icon: '📥',
    description: 'Data input source'
  },
  {
    type: 'output',
    label: 'Output',
    icon: '📤',
    description: 'Data output destination'
  },
  {
    type: 'text',
    label: 'Text',
    icon: 'T',
    description: 'Text processing with variables'
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: '🤖',
    description: 'AI language model'
  },
  {
    type: 'display',
    label: 'Display',
    icon: '📊',
    description: 'Visualize data'
  },
  {
    type: 'filter',
    label: 'Filter',
    icon: '🔍',
    description: 'Filter data'
  },
  {
    type: 'api',
    label: 'API',
    icon: '🌐',
    description: 'HTTP requests'
  },
  {
    type: 'transform',
    label: 'Transform',
    icon: '🔄',
    description: 'Text transformation'
  },
  {
    type: 'counter',
    label: 'Counter',
    icon: '🔢',
    description: 'Count and increment values'
  },
  {
    type: 'merger',
    label: 'Merger',
    icon: '🔄',
    description: 'Combine multiple inputs'
  }
];

const Sidebar = ({ onAddNode }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = (nodeType) => {
    if (onAddNode) {
      onAddNode(nodeType);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Flowchart Designer</h2>
        <p>Drag nodes to the canvas</p>
      </div>

      <div className="node-palette">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="node-item"
            onDragStart={(event) => onDragStart(event, node.type)}
            onClick={() => handleClick(node.type)}
            draggable
          >
            <div className="node-item-icon">
              {node.icon}
            </div>
            <div className="node-item-content">
              <div className="node-item-label">{node.label}</div>
              <div className="node-item-description">{node.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <p>Click nodes to select • Press Delete to remove • Drag to connect</p>
      </div>
    </div>
  );
};

export default Sidebar;