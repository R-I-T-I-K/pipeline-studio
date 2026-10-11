import { Sparkles } from 'lucide-react';

const llmConfig = {
    type: 'llm',
    label: 'LLM',
    icon: Sparkles,
    accent: '#8b5cf6',
    description: 'Runs a large language model.',
    fields: [
        { name: 'model', label: 'Model', type: 'select', options: ['gpt-4o', 'claude-sonnet-5', 'gemini-pro'], default: 'gpt-4o' },
    ],
    handles: [
        { id: 'system', type: 'target', position: 'left', label: 'system' },
        { id: 'prompt', type: 'target', position: 'left', label: 'prompt' },
        { id: 'response', type: 'source', position: 'right', label: 'response' },
    ],
};

export default llmConfig;
