// submit.js
// Sends the current pipeline to the backend and shows the analysis result.

import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Send, CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';
import { useStore } from './store';

const PARSE_URL = 'http://localhost:8000/pipelines/parse';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
    const { nodes, edges } = useStore(useShallow(selector));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setResult(null);
        try {
            const response = await fetch(PARSE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });
            if (!response.ok) {
                throw new Error(`Backend responded with status ${response.status}`);
            }
            setResult(await response.json());
        } catch (error) {
            setResult({ error: 'Could not reach the backend. Is it running on port 8000?' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                <Send size={14} />
                {isSubmitting ? 'Submitting…' : 'Submit Pipeline'}
            </button>
            {result && <ResultToast result={result} onClose={() => setResult(null)} />}
        </>
    );
};

const ResultToast = ({ result, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 8000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (result.error) {
        return (
            <div className="toast toast--error" role="alert">
                <AlertTriangle size={18} className="toast__status-icon" />
                <div>
                    <p className="toast__title">Submission failed</p>
                    <p className="toast__message">{result.error}</p>
                </div>
                <button className="toast__close" onClick={onClose} aria-label="Dismiss">
                    <X size={14} />
                </button>
            </div>
        );
    }

    const { num_nodes, num_edges, is_dag } = result;
    return (
        <div className="toast" role="alert">
            {is_dag ? (
                <CheckCircle2 size={18} className="toast__status-icon toast__status-icon--ok" />
            ) : (
                <XCircle size={18} className="toast__status-icon toast__status-icon--bad" />
            )}
            <div>
                <p className="toast__title">Pipeline analysis</p>
                <div className="toast__stats">
                    <span><strong>{num_nodes}</strong> node{num_nodes === 1 ? '' : 's'}</span>
                    <span><strong>{num_edges}</strong> edge{num_edges === 1 ? '' : 's'}</span>
                </div>
                <p className={`toast__message ${is_dag ? 'toast__message--ok' : 'toast__message--bad'}`}>
                    {is_dag
                        ? 'Valid DAG — no cycles detected.'
                        : 'Not a DAG — the pipeline contains a cycle.'}
                </p>
            </div>
            <button className="toast__close" onClick={onClose} aria-label="Dismiss">
                <X size={14} />
            </button>
        </div>
    );
};
