// BaseNode.js
// Shared shell for every node: card, header, description, declarative
// fields, and handles. Nodes are defined as plain config objects (see
// src/nodes/configs) — a new node type usually needs no new component.

import { Handle, Position } from 'reactflow';
import { NodeField } from './NodeField';

const SIDE = {
    left: Position.Left,
    right: Position.Right,
    top: Position.Top,
    bottom: Position.Bottom,
};

// Evenly spread N handles along one side of the node.
const spread = (index, count) => `${((index + 1) / (count + 1)) * 100}%`;

const NodeHandle = ({ nodeId, handle, index, count }) => {
    const axis = handle.position === 'top' || handle.position === 'bottom' ? 'left' : 'top';
    return (
        <Handle
            id={`${nodeId}-${handle.id}`}
            type={handle.type}
            position={SIDE[handle.position]}
            className={`base-handle base-handle--${handle.type}`}
            style={{ [axis]: spread(index, count) }}
        >
            {handle.label && (
                <span className={`base-handle__label base-handle__label--${handle.position}`}>
                    {handle.label}
                </span>
            )}
        </Handle>
    );
};

export const BaseNode = ({ id, data, selected, config, handles, style, children }) => {
    const resolvedHandles = handles ?? config.handles ?? [];
    const bySide = {};
    resolvedHandles.forEach((handle) => {
        (bySide[handle.position] ??= []).push(handle);
    });

    const Icon = config.icon;

    return (
        <div
            className={`base-node${selected ? ' base-node--selected' : ''}`}
            style={{ '--node-accent': config.accent, ...style }}
        >
            <div className="base-node__header">
                {Icon && (
                    <span className="base-node__icon">
                        <Icon size={13} strokeWidth={2.2} />
                    </span>
                )}
                <span className="base-node__title">{config.label}</span>
            </div>

            {config.description && (
                <p className="base-node__description">{config.description}</p>
            )}

            {config.fields?.length > 0 && (
                <div className="base-node__body">
                    {config.fields.map((field) => (
                        <NodeField
                            key={field.name}
                            nodeId={id}
                            field={field}
                            value={data?.[field.name]}
                        />
                    ))}
                </div>
            )}

            {children}

            {Object.values(bySide).map((group) =>
                group.map((handle, index) => (
                    <NodeHandle
                        key={handle.id}
                        nodeId={id}
                        handle={handle}
                        index={index}
                        count={group.length}
                    />
                ))
            )}
        </div>
    );
};
