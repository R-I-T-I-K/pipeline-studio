import { Timer } from 'lucide-react';

const delayConfig = {
    type: 'delay',
    label: 'Delay',
    icon: Timer,
    accent: '#f97316',
    fields: [
        { name: 'seconds', label: 'Seconds', type: 'number', default: '5' },
    ],
    handles: [
        { id: 'in', type: 'target', position: 'left' },
        { id: 'out', type: 'source', position: 'right' },
    ],
};

export default delayConfig;
