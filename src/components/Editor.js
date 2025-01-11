import React, { useState, useEffect } from 'react';
import Button from './Button';
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

const CustomEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const storedContent = localStorage.getItem('editorContent');
    return storedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(storedContent)))
      : EditorState.createEmpty();
  });

  const handleBeforeInput = (input) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = currentContent.getBlockForKey(blockKey);
    const blockText = block.getText();

    if (input === ' ' && blockText.startsWith('#')) {
      applyBlockType('header-one');
      removeHashCharacter();
      return 'handled';
    }

    if (input === ' ' && blockText === '*') {
      applyInlineStyle('BOLD');
      return 'handled';
    }

    if (input === ' ' && blockText === '**') {
      applyInlineStyle('red-line');
      return 'handled';
    }

    if (input === ' ' && blockText === '***') {
      applyInlineStyle('UNDERLINE');
      return 'handled';
    }

    return 'not-handled';
  };

  const removeHashCharacter = () => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = currentContent.getBlockForKey(blockKey);
    const blockText = block.getText();

    if (blockText.startsWith('#')) {
      const updatedContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }),
        '',
        null
      );

      let updatedState = EditorState.push(editorState, updatedContent, 'insert-characters');
      updatedState = RichUtils.toggleBlockType(updatedState, 'header-one');

      setEditorState(updatedState);
    }
  };

  const applyBlockType = (blockType) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(EditorState.moveFocusToEnd(newState));
  };

  const applyInlineStyle = (style) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const newContent = Modifier.removeRange(
      currentContent,
      selection.merge({ anchorOffset: 0, focusOffset: selection.getFocusOffset() }),
      'backward'
    );
    const updatedState = EditorState.push(editorState, newContent, 'remove-range');
    setEditorState(RichUtils.toggleInlineStyle(updatedState, style));
  };

  const saveContent = () => {
    const content = editorState.getCurrentContent();
    localStorage.setItem('editorContent', JSON.stringify(convertToRaw(content)));
    alert('Content saved successfully!');
  };

  const customStyleMap = {
    'red-line': { color: 'red' },
    UNDERLINE: { textDecoration: 'underline' },
  };

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      );
    }
  }, []);

  return (
    <div>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          minHeight: '300px',
          backgroundColor: '#f9f9f9',
          boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={customStyleMap}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button onClick={saveContent} label="Save" />
      </div>
    </div>
  );
};

export default CustomEditor;
