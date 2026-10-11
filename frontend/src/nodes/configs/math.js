import { Calculator } from 'lucide-react';

const mathConfig = {
    type: 'math',
    label: 'Math',
    icon: Calculator,
    accent: '#ec4899',
    fields: [
        { name: 'operation', label: 'Operation', type: 'select', options: ['Add', 'Subtract', 'Multiply', 'Divide'], default: 'Add' },
    ],
    handles: [
        { id: 'a', type: 'target', position: 'left', label: 'a' },
        { id: 'b', type: 'target', position: 'left', label: 'b' },
        { id: 'result', type: 'source', position: 'right', label: 'result' },
    ],
};

export default mathConfig;
