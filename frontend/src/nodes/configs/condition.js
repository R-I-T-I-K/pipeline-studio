import { GitBranch } from 'lucide-react';

const conditionConfig = {
    type: 'condition',
    label: 'Condition',
    icon: GitBranch,
    accent: '#f43f5e',
    fields: [
        { name: 'expression', label: 'Expression', type: 'text', placeholder: 'value > 10' },
    ],
    handles: [
        { id: 'input', type: 'target', position: 'left', label: 'input' },
        { id: 'true', type: 'source', position: 'right', label: 'true' },
        { id: 'false', type: 'source', position: 'right', label: 'false' },
    ],
};

export default conditionConfig;
