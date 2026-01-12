import React, { useState } from 'react';
import './App.css';

const SubmitButton = ({ nodes, edges }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [pipelineData, setPipelineData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
        }),
      });

      const data = await response.json();
      setPipelineData(data);
      setShowAlert(true);

      //  Simple alert for data analysis
      alert(`Pipeline Analysis:\n\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag ? 'Yes' : 'No'}`);


    } catch (error) {
      console.error('Error submitting pipeline:', error);

      alert('Error connecting to backend. Make sure the server is running on port 8000.');
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="submit-button">
        <button className="submit-btn" onClick={handleSubmit}>
          Validate WorkFlow
        </button>
      </div>

      {showAlert && pipelineData && (
        <div className="alert-overlay" onClick={closeAlert}>
          <div className="alert-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="alert-title">Pipeline Analysis</h3>
            
            <div className="alert-stats">
              <div className="stat-item">
                <div className="stat-value">{pipelineData.num_nodes}</div>
                <div className="stat-label">Nodes</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{pipelineData.num_edges}</div>
                <div className="stat-label">Connections</div>
              </div>
            </div>

            <div className={`dag-status ${pipelineData.is_dag ? 'valid' : 'invalid'}`}>
              {pipelineData.is_dag ? '✓ Valid Flowchart (DAG)' : '✗ Invalid Flowchart (Cycles Detected)'}
            </div>
  
            <button className="alert-close" onClick={closeAlert}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitButton;