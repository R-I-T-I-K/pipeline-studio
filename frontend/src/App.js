import { Workflow } from 'lucide-react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__logo">
            <Workflow size={18} />
          </span>
          <div>
            <h1 className="app__title">Pipeline Builder</h1>
            <p className="app__subtitle">Connect nodes, then submit to analyze your pipeline</p>
          </div>
        </div>
        <SubmitButton />
      </header>
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
