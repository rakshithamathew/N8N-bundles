// ZoomTranscriptNode.js

import { useState } from 'react';
import { MainNode } from './MainNode';

export default function ZoomTranscriptNode({id, data, selected }) {
  const [transcript, setTranscript] = useState(data?.raw_text || '');

  const outputs = [{ id: 'raw_text', label: 'Raw Transcript' }];

  return (
    <MainNode title="Zoom Transcript" type="input" selected={selected}  outputs={outputs}
      id={id}          
      data={data}>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste Zoom transcript here…"
        className="w-full min-h-[80px] p-2 text-sm border rounded resize-y"
      />
    </MainNode>
  );
}
