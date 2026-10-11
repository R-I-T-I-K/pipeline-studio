import { Type } from 'lucide-react';
import { TextNode } from '../TextNode';

const textConfig = {
    type: 'text',
    label: 'Text',
    icon: Type,
    accent: '#0ea5e9',
    // Custom component: adds auto-resize and {{variable}} handles on top of BaseNode.
    component: TextNode,
    initialData: { text: '{{input}}' },
};

export default textConfig;
