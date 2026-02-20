import { useState } from "react";
import { MainNode } from "./MainNode";

const MOCK_CONTENT = `
`;

export default function NotionContextNode({ id, data, selected }) {
  const [content, setContent] = useState(
    data?.notion_content || MOCK_CONTENT
  );

  const outputs = [{ id: "notion_content", label: "Notion Context" }];
  const handleChange = (e) => {
    const textarea = e.target;
    setContent(textarea.value);

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <MainNode
      title="Notion Context"
      type="text"
      selected={selected}
      outputs={outputs}
      id={id}
      data={data}
    >
      <textarea
        value={content}
        onChange={handleChange}
        className="nodrag nopan w-full text-xs text-gray-600 resize-none outline-none bg-transparent overflow-hidden"
        rows={1}
      />

    </MainNode>
  );
}
