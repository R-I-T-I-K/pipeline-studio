# Pipeline Studio

Visual node-based workflow builder. Drag nodes onto a canvas, wire them together,
and submit the graph to a FastAPI backend that validates it as a DAG.

**Frontend:** React, React Flow, Zustand. Every node type is defined by a config
object (see `frontend/src/nodes/configs/`) and rendered through one `BaseNode`.

**Backend:** FastAPI. `POST /pipelines/parse` returns node and edge counts and
whether the graph is acyclic (Kahn's algorithm).

## Run

```sh
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
cd frontend && npm install && npm start
```
