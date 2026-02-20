// draggableNode.jsx
import { useRef } from "react";

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({
            nodeType: type
        }));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            draggable
            onDragStart={(event) => onDragStart(event, type)}
            className={`
                p-[2px] 
                rounded-xl
                border border-black/20
                cursor-grab
                transition-all duration-300
                hover:scale-105 hover:shadow-lg
                active:cursor-grabbing
            `}
        >
            <div
                className={`
                    px-4 py-2
                    rounded-xl
                    transition-all duration-300
                    bg-white hover:bg-white/90
                `}
            >
                {label}
            </div>
        </div>
    );
};