import React, { useState } from 'react';
import './SubjectCards.css';

const subjects = [
  { name: 'Matematika', info: {narxi: '300ming', davomiyligi: '9-10 oy', qabul: '7-11 sinflar'} },
  { name: 'Fizika', info: 'Mexanika, yorug‘lik, elektr va boshqa tushunchalar.' },
  { name: 'Ingliz Tili', info: 'Grammatika, lug‘at boyligi va so‘zlashuv.' },
  { name: 'Kimyo', info: 'Moddalar, reaksiyalar va kimyoviy tahlillar.' },
  { name: 'Bialogiya', info: 'Organizmlar, hujayralar va genetikaga oid bilimlar.' },
  { name: 'Ona Tili', info: 'Tuzilishi, imlo va nutq madaniyati.' }
];

const SubjectCards = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="subjects-container">
      {subjects.map((subject, index) => (
        <div key={index} className="subject-card">
          <div className="circle" onClick={() => toggle(index)}>
            {subject.name}
          </div>
          {selected === index && (
            <div className="subject-info">
              Narxi: {subject.info.narxi} <br/>
              Davomiyligi: {subject.info.davomiyligi} <br/>
              Qabul yoshi: {subject.info.qabul}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubjectCards;
