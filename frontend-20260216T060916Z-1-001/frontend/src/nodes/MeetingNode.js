// MeetingNode.js
import { MainNode } from './MainNode';

function generateInsights({ segments = [], key_points = [], notion_content }) {
  return {
    summary: `Meeting covered ${segments.length} discussion points.`,
    action_items: key_points.map(
      (k) => `Follow up with ${k.speaker} on "${k.point}"`
    ),
    proposal_outline: [
      'Introduction',
      'Client Challenges',
      'Proposed Solution',
      'Next Steps',
    ],
  };
}

export default function MeetingNode({id, data, setData, selected }) {
  const inputs = [
    { id: 'segments', label: 'Segments' },
    { id: 'key_points', label: 'Key Points' },
    { id: 'notion_content', label: 'Notion Context' },
  ];

  const outputs = [
    { id: 'summary', label: 'Summary' },
    { id: 'action_items', label: 'Action Items' },
    { id: 'proposal_outline', label: 'Proposal Outline' },
  ];

  const handleGenerate = () => {
    const insights = generateInsights(data);
    setData((d) => ({ ...d, ...insights }));
  };

  return (
    <MainNode
      title="Meeting Insights"
      type="llm"
      inputs={inputs}
      selected={selected} 
      outputs={outputs}
      id={id}          
      data={data}
    >
      <button
        onClick={handleGenerate}
        className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
      >
        Generate Insights
      </button>
    </MainNode>
  );
}
