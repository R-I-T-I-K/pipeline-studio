// NodeField.js
// Renders one declarative field (text | number | select | textarea) and
// writes changes straight to the store, so node data is always current
// when the pipeline is submitted.

import { useStore } from '../store';

export const NodeField = ({ nodeId, field, value }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const onChange = (event) => updateNodeField(nodeId, field.name, event.target.value);
    const current = value ?? '';

    let control;
    if (field.type === 'select') {
        control = (
            <select className="nodrag" value={current} onChange={onChange}>
                {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        );
    } else if (field.type === 'textarea') {
        control = (
            <textarea
                className="nodrag"
                rows={field.rows ?? 3}
                value={current}
                onChange={onChange}
                placeholder={field.placeholder}
            />
        );
    } else {
        control = (
            <input
                className="nodrag"
                type={field.type === 'number' ? 'number' : 'text'}
                value={current}
                onChange={onChange}
                placeholder={field.placeholder}
            />
        );
    }

    return (
        <label className="node-field">
            <span className="node-field__label">{field.label}</span>
            {control}
        </label>
    );
};
