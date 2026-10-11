// store.js

import { create } from 'zustand';
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
    },
    onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) });
    },
    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge({
                ...connection,
                type: 'smoothstep',
                animated: true,
                markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
            }, get().edges),
        });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
                    : node
            ),
        });
    },
    // Drops edges pointing at target handles that no longer exist on a node
    // (e.g. a {{variable}} handle removed from a Text node).
    pruneTargetEdges: (nodeId, validHandleIds) => {
        const edges = get().edges.filter(
            (edge) => edge.target !== nodeId || validHandleIds.includes(edge.targetHandle)
        );
        if (edges.length !== get().edges.length) {
            set({ edges });
        }
    },
}));
