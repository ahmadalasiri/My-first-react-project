import React from 'react';
import Header from './components/Header';
import PostsList from './components/PostsList';
import TagsContainer from './components/TagsContainer';
import './TarmeezAcademy.css';

function TarmeezAcademy() {
  return (
    <div className="tarmeez-academy">
      <Header />
      <div className="content">
        <PostsList />
        <TagsContainer />
      </div>
    </div>
  );
}

export default TarmeezAcademy; 