import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar';
import TextNode from './nodes/TextNode';
import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LLMNode from './nodes/LLMNode';
import DisplayNode from './nodes/DisplayNode';
import FilterNode from './nodes/FilterNode';
import APIRequestNode from './nodes/APIRequestNode';
import TransformNode from './nodes/TransformNode';
import CounterNode from './nodes/CounterNode';
import MergerNode from './nodes/MergerNode';
import SubmitButton from './submit';

import './App.css';

// Node types 
const nodeTypes = {
  text: TextNode,
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  display: DisplayNode,
  filter: FilterNode,
  api: APIRequestNode,
  transform: TransformNode,
  counter: CounterNode,
  merger: MergerNode

};

const initialNodes = [];
const initialEdges = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const handleDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const onConnect = useCallback((params) => {
  console.log('onConnect called →', params);
  
  setEdges((eds) => addEdge(params, eds));
}, [setEdges]);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleTextNodeChange = useCallback((nodeId, newText, variables) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              content: newText,
              variables: variables,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNodeToCanvas(type, position);
    },
    [reactFlowInstance, handleTextNodeChange]
  );

  const addNodeToCanvas = useCallback((type, position = null) => {
    if (!reactFlowInstance && !position) {
      console.warn('ReactFlow instance not ready');
      return;
    }

    let nodePosition = position;
    if (!nodePosition) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      nodePosition = reactFlowInstance.project({
        x: reactFlowBounds.width / 2 - 100,
        y: reactFlowBounds.height / 2 - 50,
      });
    }

    const nodeId = getId();

    const newNode = {
      id: nodeId,
      type,
      position: nodePosition,
      data: {
        label: type === 'llm' ? 'LLM Node' : `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        onDelete: handleDeleteNode,
        nodeId: nodeId,
        ...(type === 'text' && {
          onTextChange: (newText, variables, nodeId) => handleTextNodeChange(nodeId, newText, variables)
        })
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance, handleDeleteNode, handleTextNodeChange]);

  // keyboard delete 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        const selectedNodes = nodes.filter(node => node.selected);
        selectedNodes.forEach(node => {
          handleDeleteNode(node.id);
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nodes, handleDeleteNode]);

  return (
    <div className="app">
      <Sidebar onAddNode={addNodeToCanvas} />
      <div className="flow-container" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={['Delete']} 
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <SubmitButton nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;



