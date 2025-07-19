import React, { useState, useEffect } from 'react';
import './index.css'
const phrases = [
    "Bilim — kelajakning kalitidir.",
    "Har kun — yangi imkoniyat.",
    "O‘rgan, o‘s, ilhom ber!",
    "Kelajakni bilim bilan quramiz.",
    "Orzu qil, intil, erish!",
    "Bugungi mehnat — ertangi zafar."
  ];
const Typewriter = () => {
  

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0); // qaysi phrase
  const [subIndex, setSubIndex] = useState(0); // qaysi harf
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= phrases.length) return;

    if (
      subIndex === phrases[index].length + 1 &&
      !deleting
    ) {
      // kutib o‘chirish boshlansin
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      // o‘chirish tugadi, keyingi phrase
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) =>
        prev + (deleting ? -1 : 1)
      );
      setText(
        phrases[index].substring(0, subIndex)
      );
    }, deleting ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <h2 style={{ fontFamily: 'monospace' , fontSize: 40}}>
      {text}
      <span className="cursor">|</span>
    </h2>
  );
};

export default Typewriter;