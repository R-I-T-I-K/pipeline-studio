import { LogOut } from 'lucide-react';

const outputConfig = {
    type: 'customOutput',
    label: 'Output',
    icon: LogOut,
    accent: '#f59e0b',
    fields: [
        { name: 'outputName', label: 'Name', type: 'text', default: (id) => id.replace('customOutput-', 'output_') },
        { name: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'], default: 'Text' },
    ],
    handles: [
        { id: 'value', type: 'target', position: 'left' },
    ],
};

export default outputConfig;
