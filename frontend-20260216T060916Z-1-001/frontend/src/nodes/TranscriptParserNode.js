import { MainNode } from './MainNode';
function parseTranscript(raw = '') {
  const lines = raw.split('\n').filter(Boolean);

  const segments = [];
  const key_points = [];

  lines.forEach((line) => {
    const [speaker, ...rest] = line.split(':');
    const text = rest.join(':').trim();

    if (!text) return;

    segments.push({ speaker, text });

    if (
      text.toLowerCase().includes('need') ||
      text.toLowerCase().includes('should') ||
      text.toLowerCase().includes('action')
    ) {
      key_points.push({ speaker, point: text });
    }
  });

  return { segments, key_points };
}

export default function TranscriptParserNode({ id, data, setData, selected }) {
  const outputs = [
    { id: 'segments' },
    { id: 'key_points' }
  ];

  return (
    <>


      <MainNode
        id={id}
        data={data}
        selected={selected}
        title="Transcript Parser"
        type="text"
        outputs={outputs}
      >
        <button
          className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm"
          onClick={() => {
            const parsed = parseTranscript(data.raw_text);
            setData({ ...data, ...parsed });
          }}
        >
          Parse Transcript
        </button>
      </MainNode>

    </>
  );
}
