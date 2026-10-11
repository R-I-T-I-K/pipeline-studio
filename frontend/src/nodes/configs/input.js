import { LogIn } from 'lucide-react';

const inputConfig = {
    type: 'customInput',
    label: 'Input',
    icon: LogIn,
    accent: '#10b981',
    fields: [
        { name: 'inputName', label: 'Name', type: 'text', default: (id) => id.replace('customInput-', 'input_') },
        { name: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'], default: 'Text' },
    ],
    handles: [
        { id: 'value', type: 'source', position: 'right' },
    ],
};

export default inputConfig;
