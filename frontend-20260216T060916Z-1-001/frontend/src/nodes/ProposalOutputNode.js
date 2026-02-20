import { useState, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";
import { MainNode } from "./MainNode";

function formatOutput(data) {
  return `MEETING SUMMARY
${data.summary || ""}

ACTION ITEMS
${(data.action_items || []).join("\n")}

PROPOSAL OUTLINE
${(data.proposal_outline || []).join("\n")}
`;
}

export default function ProposalOutputNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();
  const textareaRef = useRef(null);

  const [value, setValue] = useState(formatOutput(data));

  useEffect(() => {
    setValue(formatOutput(data));
  }, [data]);

  const handleChange = (e) => {
    const textarea = e.target;
    setValue(textarea.value);

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    const newHeight = textarea.scrollHeight + 120;

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              style: {
                ...node.style,
                height: newHeight,
              },
            }
          : node
      )
    );
  };

  const inputs = [
    { id: "summary", label: "Summary" },
    { id: "action_items", label: "Action Items" },
    { id: "proposal_outline", label: "Proposal Outline" },
  ];

  return (
    <MainNode
      title="Proposal Output"
      type="output"
      selected={selected}
      inputs={inputs}
      id={id}
      data={data}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="nodrag nopan text-xs w-full bg-gray-50 p-2 rounded resize-none overflow-hidden focus:outline-none"
        style={{ minHeight: 120 }}
      />
    </MainNode>
  );
}
