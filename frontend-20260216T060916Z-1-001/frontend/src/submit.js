import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data
          })),
          edges: edges.map(edge => ({
            source: edge.source,
            target: edge.target,
            id: edge.id
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse pipeline');
      }

      const data = await response.json();
      
      const dagStatus = data.is_dag ? '✅ is a DAG' : '❌ is not a DAG';
      const message = `Pipeline Analysis:\n\n` +
        `📊 Number of Nodes: ${data.num_nodes}\n` +
        `🔗 Number of Edges: ${data.num_edges}\n` +
        `📈 DAG Status: ${dagStatus}`;
      
      alert(message);
      
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('Error submitting pipeline. Please check your connection to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`
          relative group
          px-8 py-3
          rounded-xl
          font-medium text-gray-700
          transition-all duration-300
          ${isLoading 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-105 hover:shadow-lg'
          }
        `}
      >
        <div className="absolute inset-0 rounded-xl bg-white/30 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]" />
        
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Submit Pipeline
            </>
          )}
        </span>
      </button>
    </div>
  );
};