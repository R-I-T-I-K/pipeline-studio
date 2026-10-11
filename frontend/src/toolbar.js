// toolbar.js
// Node palette — generated from the node registry.

import { DraggableNode } from './draggableNode';
import { nodeConfigs } from './nodes/registry';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <span className="toolbar__hint">Drag a node onto the canvas</span>
            <div className="toolbar__items">
                {nodeConfigs.map((config) => (
                    <DraggableNode
                        key={config.type}
                        type={config.type}
                        label={config.label}
                        icon={config.icon}
                        accent={config.accent}
                    />
                ))}
            </div>
        </div>
    );
};
