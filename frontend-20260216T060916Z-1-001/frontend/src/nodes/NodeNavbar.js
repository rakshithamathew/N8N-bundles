import {
  FaDatabase,
  FaCode,
  FaCogs,
  FaProjectDiagram,
} from "react-icons/fa";

const nodeItems = [
  { type: "input", label: "Input", icon: <FaDatabase /> },
  { type: "process", label: "Process", icon: <FaCogs /> },
  { type: "logic", label: "Logic", icon: <FaCode /> },
  { type: "output", label: "Output", icon: <FaProjectDiagram /> },
];

export const NodeNavbar = () => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="fixed top-0 w-full z-50 pt-24">
      <div className="
        backdrop-blur-2xl 
        bg-gradient-to-r 
        from-purple-700/30 
        via-indigo-600/30 
        to-blue-600/30 
        border-b border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      ">
        <div className="flex items-center gap-8 px-8 py-4">
          {nodeItems.map((item) => (
            <div
              key={item.type}
              draggable
              onDragStart={(event) => onDragStart(event, item.type)}
              className="
                group
                cursor-grab active:cursor-grabbing
                flex flex-col items-center justify-center
                px-5 py-3
                rounded-2xl
                text-white text-sm font-medium
                backdrop-blur-xl
                bg-gradient-to-br
                from-purple-500/40
                to-blue-500/30
                border border-white/10
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_10px_25px_rgba(124,58,237,0.4)]
                hover:from-purple-500/60
                hover:to-blue-500/50
                active:scale-95
              "
            >
              <div className="text-xl mb-1 group-hover:scale-110 transition">
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
