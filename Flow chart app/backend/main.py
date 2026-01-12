from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque
import json

app = FastAPI()

# CORS middleware to allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using topological sort
    """

    if not nodes or not edges:
        return True

    graph = {}
    indegree = {}

    # Initialize indegree for all nodes
    for node in nodes:
        node_id = node['id']
        graph[node_id] = []
        indegree[node_id] = 0

    # Build graph from edges
    for edge in edges:
        source = edge['source']
        target = edge['target']

    
        if source in graph and target in graph:
            graph[source].append(target)
            indegree[target] += 1

    queue = []
    for node_id in graph:
        if indegree[node_id] == 0:
            queue.append(node_id)
    
    
    visited_count = 0
    while queue:
        current = queue.pop(0)
        visited_count += 1

        for neighbor in graph.get(current, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(nodes)

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineRequest):

    """
    Parse pipeline and return node count, edge count, and DAG status
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_result
    }

@app.get("/")
async def root():
    return {"message": "Flowchart Designer Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)