Flowchart Designer - Visual Workflow Builder
🎯 Project Overview
A drag-and-drop flowchart designer application that allows users to create, visualize, and validate data processing pipelines using a node-based interface. The application features dynamic node creation, real-time validation, and a full-stack architecture with React frontend and FastAPI backend.

✨ Key Features
Frontend (React)
Drag & Drop Interface: Intuitive canvas for building flowcharts

10+ Node Types: Input, Output, Text, LLM, Display, Filter, API, Transform, Counter, Merger nodes

Dynamic Text Nodes: Auto-resizing textareas with variable detection ({{variables}})

Real-time Connections: Visual connections between nodes with handle management

Keyboard Support: Delete key for node removal

Responsive Design: Clean UI with custom styling

Backend (FastAPI - Python)
Pipeline Validation: Analyzes workflow structure

DAG Detection: Identifies cycles using Kahn's Algorithm

REST API: Simple endpoint for pipeline analysis

CORS Enabled: Secure frontend-backend communication

Validation System
Node/Edge Counting: Tracks pipeline complexity

Cycle Detection: Ensures workflows are Directed Acyclic Graphs (DAGs)

Dual Alerts: Both simple (requirements) and styled (UX) result displays

🛠️ Tech Stack
Frontend
React 18 with functional components and hooks

React Flow 11 for flowchart visualization

CSS Modules for component styling

Modern ES6+ JavaScript

Backend
FastAPI for REST API development

Python 3.9+ with type hints

Pydantic for data validation

Topological Sort for DAG detection
