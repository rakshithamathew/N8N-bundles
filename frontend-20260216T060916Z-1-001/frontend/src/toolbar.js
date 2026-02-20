import { DraggableNode } from "./draggableNode";
import {
    FaKeyboard,
    FaBrain,
    FaFileExport,
    FaFont,
    FaVideo,
    FaProjectDiagram,
    FaDatabase,
    FaLightbulb,
    FaFileAlt,
} from "react-icons/fa";

const nodeConfig = [
    { type: "customInput", label: "Input", icon: <FaKeyboard /> },
    { type: "llm", label: "LLM", icon: <FaBrain /> },
    { type: "customOutput", label: "Output", icon: <FaFileExport /> },
    { type: "text", label: "Text", icon: <FaFont /> },
    { type: "zoomTranscript", label: "Zoom Transcript", icon: <FaVideo /> },
    { type: "transcriptStructurer", label: "Structurer", icon: <FaProjectDiagram /> },
    { type: "notionContext", label: "Notion Context", icon: <FaDatabase /> },
    { type: "meetingInsights", label: "Insights", icon: <FaLightbulb /> },
    { type: "proposalOutput", label: "Proposal", icon: <FaFileAlt /> },
];

export const PipelineToolbar = () => {
    return (
        <div className="fixed top-0 w-full z-50 isolate">

            <div className="relative">

                <div
                    className="
    absolute inset-0
    bg-white/95
    backdrop-blur-2xl
    backdrop-saturate-150
    border border-black-200/50
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]
  "
                />

                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        filter: "url(#glass-distortion)",
                        WebkitFilter: "url(#glass-distortion)",
                    }}
                />

                <div className="absolute inset-0 rounded-none shadow-inner pointer-events-none" />

                <div className="p-[0,5px] bg-gradient-to-r from-black-900 via-black-600 to-black-400">

                    <div className="relative flex items-center gap-6 px-8 py-4 flex-wrap 
                    border-b border-black-200/30 bg-white">
                        {nodeConfig.map((node) => (
                            <DraggableNode
                                key={node.type}
                                type={node.type}
                                label={
                                    <div className="flex flex-col items-center">
                                        <div className="text-lg mb-1 text-black-800">
                                            {node.icon}
                                        </div>
                                        <span className="text-xs font-medium text-black-700">
                                            {node.label}
                                        </span>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};