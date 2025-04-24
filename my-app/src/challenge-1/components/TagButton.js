import React from 'react';
import './TagButton.css';

function TagButton({ label }) {
  return (
    <button className="tag-button">
      {label}
    </button>
  );
}

export default TagButton; 