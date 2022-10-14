import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewResume.css';

const NewResume = () => {
  return (
    <form className="resume-form">
      <Input element="input" type="text" label="Title" />
    </form>
  );
};

export default NewResume;
