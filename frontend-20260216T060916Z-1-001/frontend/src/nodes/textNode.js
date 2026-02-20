import { useState, useEffect, useRef, useMemo } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "reactflow";
import { MainNode } from "./MainNode";

const VARIABLE_REGEX = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);
  const { setNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => {
    const matches = [...currText.matchAll(VARIABLE_REGEX)];
    return [...new Set(matches.map((m) => m[1]))];
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  useEffect(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;

    requestAnimationFrame(() => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";

      const headerHeight = 60;
      const padding = 24;
      const newHeight = textarea.scrollHeight + headerHeight + padding;

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) return node;

          const currentHeight = node.style?.height || 0;

          if (newHeight <= currentHeight) return node;

          return {
            ...node,
            style: {
              ...node.style,
              height: newHeight,
            },
          };
        })
      );
    });
  }, [currText, id, setNodes]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const outputs = [{ id: `${id}-output` }];

  return (
    <MainNode
      id={id}
      data={data}
      title="Text"
      type="text"
      outputs={outputs}
    >
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: 60 + index * 28 }}
        />
      ))}

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">
          Text:
        </label>

        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text..."
          className="w-full px-2 py-1 text-sm border rounded resize-none focus:outline-none focus:ring-1 focus:ring-gray-500"
          rows={1}
        />
      </div>
    </MainNode>
  );
};
