# from fastapi import FastAPI
# from pydantic import BaseModel

# app = FastAPI()

# class LLMRequest(BaseModel):
#     segments: list
#     key_points: list
#     notion_content: str | None = None

# @app.post("/api/llm")
# def process_llm(data: LLMRequest):
#     summary = f"Meeting discussed {len(data.segments)} topics."

#     action_items = [
#         f"Follow up with {k['speaker']} on {k['point']}"
#         for k in data.key_points
#     ]

#     proposal_outline = [
#         "Introduction",
#         "Client Pain Points",
#         "Proposed Solution",
#         "Timeline & Next Steps"
#     ]

#     return {
#         "summary": summary,
#         "action_items": action_items,
#         "proposal_outline": proposal_outline
#     }

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import networkx as nx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Optional[Dict[str, Any]] = {}

class Edge(BaseModel):
    source: str
    target: str
    id: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
async def parse_pipeline(pipeline: Pipeline):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        G = nx.DiGraph()
        
        for node in pipeline.nodes:
            G.add_node(node.id)
        
        for edge in pipeline.edges:
            G.add_edge(edge.source, edge.target)
        
        is_dag = nx.is_directed_acyclic_graph(G)
        
        return PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/health')
async def health_check():
    return {'status': 'healthy'}