import React from 'react';
import TagButton from './TagButton';
import './TagsContainer.css';

function TagsContainer() {
  // Array of tag labels
  const tags = Array(13).fill("Tag Button");

  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <TagButton key={index} label={tag} />
      ))}
    </div>
  );
}

export default TagsContainer; 