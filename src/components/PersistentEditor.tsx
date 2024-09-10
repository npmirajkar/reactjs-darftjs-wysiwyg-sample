import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Paper } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface PersistentEditorProps {
  placeholder?: string;
  readonly?: boolean;
  initialValue?: string;
  onContentChange?: (content: string) => void;
}

const sampleHtml = `
<h2>Welcome to the DraftJS Editor!</h2>
<p>This is a <strong>rich text editor</strong> built with <em>Draft.js</em>. It supports various formatting options:</p>
<ul>
  <li>Bold</li>
  <li>Italic</li>
  <li>Underline</li>
  <li>Lists (ordered and unordered)</li>
</ul>
<p>You can also add <a href="https://example.com">links</a> and change text alignment.</p>
<blockquote>This is a blockquote. It's great for emphasizing important information.</blockquote>
<p style="text-align: center;">This text is center-aligned.</p>
`;

const PersistentEditor: React.FC<PersistentEditorProps> = ({
  placeholder,
  readonly,
  initialValue = sampleHtml,
  onContentChange,
}) => {
  const [editorState, setEditorState] = useState(() => {
    const contentBlock = htmlToDraft(initialValue);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    const contentBlock = htmlToDraft(initialValue);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialValue]);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    if (onContentChange) {
      const content = draftToHtml(
        convertToRaw(newEditorState.getCurrentContent())
      );
      onContentChange(content);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '10px', marginBottom: '20px' }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            'remove',
            'history',
          ],
        }}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </Paper>
  );
};

export default PersistentEditor;
