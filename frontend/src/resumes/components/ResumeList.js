import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import ResumeItem from './ResumeItem';
import Button from '../../shared/components/FormElements/Button';
import './ResumeList.css';

const ResumeList = props => {
  if (props.items.length === 0) {
    return (
      <div className="resume-list center">
        <Card>
          <h2>No resumes found. Maybe create one?</h2>
          <Button to="/resumes/new">Share Resume</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="resume-list">
      {props.items.map(resume => (
        <ResumeItem
          key={resume.id}
          id={resume.id}
          image={resume.imageUrl}
          title={resume.title}
          description={resume.description}
          creatorId={resume.creator}
        />
      ))}
    </ul>
  );
};

export default ResumeList;
