// TranscriptStructurerNode.js
import { MainNode } from './MainNode';

function structureTranscript(raw = '') {
  const lines = raw.split('\n').filter(Boolean);

  const segments = [];
  const key_points = [];

  lines.forEach((line) => {
    const [speaker, ...rest] = line.split(':');
    const text = rest.join(':').trim();

    if (!text) return;

    segments.push({ speaker, text });

    if (
      /need|should|action|follow up|next step/i.test(text)
    ) {
      key_points.push({ speaker, point: text });
    }
  });

  return { segments, key_points };
}

export default function TranscriptStructurerNode({ id, data, setData, selected }) {
  const inputs = [{ id: "raw_text" }];
  const outputs = [
    { id: "segments" },
    { id: "key_points" },
  ];

  const handleClick = () => {
    const structured = structureTranscript(data.raw_text);
    setData((d) => ({ ...d, ...structured }));
  };

  return (
    <MainNode
      id={id}
      data={data}
      title="Transcript Structurer"
      type="text"
      inputs={inputs}
      outputs={outputs}
      selected={selected}
    >
      <button
        onClick={handleClick}
        className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm"
      >
        Structure Transcript
      </button>
    </MainNode>
  );
}

