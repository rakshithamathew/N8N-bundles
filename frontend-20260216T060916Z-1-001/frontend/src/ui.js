import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import ZoomTranscriptNode from "./nodes/ZoomTranscriptNode";
import NotionContextNode from "./nodes/NotionContextNode";
import TranscriptStructurerNode from "./nodes/TranscriptStructurerNode.js";
import MeetingNode from "./nodes/MeetingNode";
import ProposalOutputNode from "./nodes/ProposalOutputNode";
import "reactflow/dist/style.css";
import dagre from "dagre";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  zoomTranscript: ZoomTranscriptNode,
  notionContext: NotionContextNode,
  transcriptStructurer: TranscriptStructurerNode,
  meetingInsights: MeetingNode,
  proposalOutput: ProposalOutputNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  deleteNode: state.deleteNode,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    deleteNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
    onDelete: deleteNode,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const { nodeType: type } = JSON.parse(data);
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        style: {
          width: 300,
          height: 160,
        },
        data: getInitNodeData(nodeID, type),
      });

    },
    [reactFlowInstance, getNodeID, addNode, deleteNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const nodeWidth = 300;
  const nodeHeight = 160;

  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  };
  const formatPipeline = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } =
      getLayoutedElements(nodes, edges);

    useStore.setState({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
  }, [nodes, edges]);



  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: "100vw", height: "70vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        minZoom={0.5}
        maxZoom={1.5}

      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <button
        onClick={formatPipeline}
        className="relative group w-14 h-14 rounded-full p-[2px] transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full  animate-spin-slow" />

        <span className="relative flex items-center justify-center w-full h-full rounded-full 
     backdrop-blur-xl border border-white/90 
    shadow-lg hover:scale-105 transition-all duration-300">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 6h18M7 12h10M10 18h4" />
          </svg>

        </span>
      </button>


    </div>
  );
};
