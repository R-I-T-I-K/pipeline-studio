import { Globe } from 'lucide-react';

const apiRequestConfig = {
    type: 'apiRequest',
    label: 'API Request',
    icon: Globe,
    accent: '#06b6d4',
    fields: [
        { name: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
        { name: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com' },
    ],
    handles: [
        { id: 'body', type: 'target', position: 'left', label: 'body' },
        { id: 'response', type: 'source', position: 'right', label: 'response' },
    ],
};

export default apiRequestConfig;
