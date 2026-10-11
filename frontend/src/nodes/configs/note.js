import { StickyNote } from 'lucide-react';

// No handles at all — demonstrates that connections are optional in the abstraction.
const noteConfig = {
    type: 'note',
    label: 'Note',
    icon: StickyNote,
    accent: '#64748b',
    description: 'Annotation only — has no connections.',
    fields: [
        { name: 'note', label: 'Note', type: 'textarea', placeholder: 'Write a comment for your team…' },
    ],
    handles: [],
};

export default noteConfig;
