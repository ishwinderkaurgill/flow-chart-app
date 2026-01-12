import React, { useState, useRef, useEffect } from 'react';
import BaseNode from './BaseNode';
import { useUpdateNodeInternals } from 'reactflow';

const TextNode = ({ data = {}, selected, id }) => {
  const [text, setText] = useState(data?.content || '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Extract variables from text
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
    const matches = [...text.matchAll(regex)];
    const foundVars = matches.map(match => match[1]);
    setVariables(foundVars);
  }, [text]);

  // Auto-resize textarea AND update React Flow handles
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      
      setTimeout(() => {
        updateNodeInternals(id);
      }, 0);
    }
  }, [text, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const customHandles = {
    inputs: variables.map((variable, index) => ({
      id: `input-${variable}`,
      position: (index + 1) * (100 / (variables.length + 1))
    })),
    outputs: [
      {
        id: 'output',
        position: 50
      }
    ]
  };

  return (
    <BaseNode
      data={{
        ...data,
        label: 'Text',
        content: (
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text... Use {{variable_name}}"
            style={{
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
              resize: 'none',
              fontSize: '13px',
              fontFamily: 'inherit',
              background: 'white',
              minHeight: '60px',
              padding: '8px',
              boxSizing: 'border-box'
            }}
          />
        )
      }}
      selected={selected}
      type="text"
      icon="T"
      handles={customHandles}
      id={id}
    />
  );
};

export default TextNode;