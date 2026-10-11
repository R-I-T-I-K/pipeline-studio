// TextNode.js
// Text node with two behaviors on top of BaseNode:
//  1. The node grows with its content (width from the longest line, height
//     from the textarea's scrollHeight), clamped to sane bounds.
//  2. Every valid {{variable}} in the text gets a target handle on the left.
//     Removing a variable removes its handle and any edge attached to it.

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

// A valid JavaScript identifier (ASCII form) inside {{ }}, e.g. {{ input }}.
const VARIABLE_PATTERN = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

export const extractVariables = (text) => {
    const names = new Set();
    for (const match of text.matchAll(VARIABLE_PATTERN)) {
        names.add(match[1]);
    }
    return [...names];
};

const MIN_WIDTH = 240;
const MAX_WIDTH = 480;
const CHAR_WIDTH = 7.4; // approx px per character at the textarea's font size
const PADDING = 64;

export const TextNode = ({ id, data, selected, config }) => {
    const text = data?.text ?? '';
    const updateNodeField = useStore((state) => state.updateNodeField);
    const pruneTargetEdges = useStore((state) => state.pruneTargetEdges);
    const updateNodeInternals = useUpdateNodeInternals();
    const textareaRef = useRef(null);

    const variables = useMemo(() => extractVariables(text), [text]);
    const variablesKey = variables.join('|');

    // Re-register handles with React Flow and drop edges to removed variables.
    useLayoutEffect(() => {
        updateNodeInternals(id);
        pruneTargetEdges(id, variables.map((name) => `${id}-${name}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, variablesKey, updateNodeInternals, pruneTargetEdges]);

    // Auto-grow the textarea height with content.
    useLayoutEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    }, [text]);

    const longestLine = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
    const width = Math.min(Math.max(MIN_WIDTH, longestLine * CHAR_WIDTH + PADDING), MAX_WIDTH);

    const handles = [
        ...variables.map((name) => ({ id: name, type: 'target', position: 'left', label: name })),
        { id: 'output', type: 'source', position: 'right' },
    ];

    return (
        <BaseNode id={id} data={data} selected={selected} config={config} handles={handles} style={{ width }}>
            <div className="base-node__body">
                <label className="node-field">
                    <span className="node-field__label">Text</span>
                    <textarea
                        ref={textareaRef}
                        className="nodrag text-node__textarea"
                        rows={1}
                        value={text}
                        onChange={(event) => updateNodeField(id, 'text', event.target.value)}
                        placeholder="Type text — use {{variable}} to add an input"
                        spellCheck={false}
                    />
                </label>
                {variables.length > 0 && (
                    <div className="text-node__variables">
                        {variables.map((name) => (
                            <span key={name} className="text-node__variable">{name}</span>
                        ))}
                    </div>
                )}
            </div>
        </BaseNode>
    );
};
