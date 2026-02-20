import { Handle, Position } from "reactflow";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";
import { useReactFlow } from "reactflow";


const nodeStyles = {
  input: `
    bg-white/80 backdrop-blur-md 
    border-blue-400/60 
    hover:border-blue-500
  `,
  output: `
    bg-white/80 backdrop-blur-md 
    border-emerald-400/60 
    hover:border-emerald-500
  `,
  llm: `
    bg-white/80 backdrop-blur-md 
    border-purple-400/60 
    hover:border-purple-500
  `,
  text: `
    bg-white/80 backdrop-blur-md 
    border-gray-400/60 
    hover:border-gray-500
  `,
  default: `
    bg-white/80 backdrop-blur-md 
    border-gray-300 
    hover:border-gray-400
  `,
};

const headerGradients = {
  input: "from-blue-500 to-blue-600",
  output: "from-emerald-500 to-emerald-600",
  llm: "from-purple-500 to-purple-600",
  text: "from-gray-500 to-gray-600",
  default: "from-gray-400 to-gray-500",
};

const handleStyles = {
  target: `
    !bg-blue-500 
    !w-3 !h-3 
    !border-2 !border-white 
    shadow-md
  `,
  source: `
    !bg-emerald-500 
    !w-3 !h-3 
    !border-2 !border-white 
    shadow-md
  `,
};

export const MainNode = ({
  id,
  data,
  title,
  type = "default",
  inputs = [],
  outputs = [],
  children,
  customStyles = {},
}) => {
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (data?.onDelete) {
      data.onDelete(id);
    } else {
      console.warn("onDelete not provided for node:", id);
    }
  };

  const { setNodes } = useReactFlow();

  useEffect(() => {
    if (!contentRef.current) return;

    let frameId = null;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id !== id) return node;

            const newWidth = Math.max(260, width + 32);
            const newHeight = Math.max(120, height + 60);

            if (
              node.style?.width === newWidth &&
              node.style?.height === newHeight
            ) {
              return node;
            }

            return {
              ...node,
              style: {
                ...node.style,
                width: newWidth,
                height: newHeight,
              },
            };
          })
        );
      });
    });

    resizeObserver.observe(contentRef.current);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [id, setNodes]);

  return (
    <div
      className={`
        relative 
        border rounded-2xl
        shadow-md
        transition-all duration-300 ease-out
        ${nodeStyles[type]}
        ${isHovered ? "shadow-2xl scale-[1.02]" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 120,
        minWidth: 260,

        ...customStyles,
      }}
    >

      <div
        className={`
          flex items-center justify-between
          px-4 py-2 
         bg-black backdrop-blur-sm
          text-white
          rounded-t-2xl
        `}
      >
        <span className="font-semibold text-sm tracking-wide">
          {title}
        </span>

        <button
          onClick={handleDelete}
          className="nodrag nopan p-1 rounded-md hover:bg-white/20 transition"
          title="Delete Node"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div
        ref={contentRef}
        className="p-4 space-y-2 text-sm text-gray-700"
      >
        {children}
      </div>

      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          className={`${handleStyles.target} ${input.className || ""}`}
          style={{
            top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
            transition: "all 0.2s ease",
            ...input.style,
          }}
        />
      ))}

      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          className={`${handleStyles.source} ${output.className || ""}`}
          style={{
            top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
            transition: "all 0.2s ease",
            ...output.style,
          }}
        />
      ))}
    </div>
  );
};
