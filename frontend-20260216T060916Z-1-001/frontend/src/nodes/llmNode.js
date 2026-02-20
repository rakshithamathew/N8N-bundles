// llmNode.js
import { MainNode } from './MainNode';

export const LLMNode = ({ id, data, setData, selected }) => {
  const inputs = [
    { id: 'segments' },
    { id: 'key_points' },
    { id: 'notion_content' }
  ];

  const outputs = [
    { id: 'summary' },
    { id: 'action_items' },
    { id: 'proposal_outline' }
  ];

  async function runLLM() {
    const res = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    setData({ ...data, ...result });
  }

  return (
    <MainNode title="LLM Processor" type="llm" inputs={inputs} selected={selected}  outputs={outputs} id={id}          // ✅ REQUIRED
      data={data}>
      <button
        className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
        onClick={runLLM}
      >
        Generate Insights
      </button>
    </MainNode>
  );
};
