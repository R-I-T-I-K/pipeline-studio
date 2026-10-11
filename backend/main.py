from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


class Pipeline(BaseModel):
    nodes: list[dict[str, Any]] = Field(default_factory=list)
    edges: list[dict[str, Any]] = Field(default_factory=list)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_dag(node_ids: set[str], edges: list[tuple[str, str]]) -> bool:
    """Kahn's algorithm: acyclic iff every node can be topologically sorted."""
    adjacency = defaultdict(list)
    indegree = {node_id: 0 for node_id in node_ids}
    for source, target in edges:
        adjacency[source].append(target)
        indegree[target] += 1

    queue = deque(node_id for node_id, degree in indegree.items() if degree == 0)
    visited = 0
    while queue:
        node_id = queue.popleft()
        visited += 1
        for neighbor in adjacency[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(indegree)


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    node_ids = {node['id'] for node in pipeline.nodes if node.get('id')}
    # Edges referencing unknown nodes are still counted, but excluded from the
    # cycle check so a malformed payload cannot crash the traversal.
    edges = [
        (edge['source'], edge['target'])
        for edge in pipeline.edges
        if edge.get('source') in node_ids and edge.get('target') in node_ids
    ]
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag(node_ids, edges),
    }
