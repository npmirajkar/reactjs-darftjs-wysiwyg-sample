import React from 'react';
import PersistentEditor from './components/PersistentEditor';

const App: React.FC = () => {
  const handleContentChange = (content: string) => {
    console.log('Editor content changed:', content);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>DraftJS Persistent Editor</h1>
      <PersistentEditor
        placeholder="Start typing..."
        onContentChange={handleContentChange}
        // You can provide your own initial value here, or omit it to use the sample data
        // initialValue="<p>Your custom initial content goes here.</p>"
      />
    </div>
  );
};

export default App;
