import replaceInput from '@utils/replaceInput';
import React, { useEffect, useRef, useState } from 'react';

const TextareaHeader = ({ articles, setArticles, collect }) => {
  const [value, setValue] = useState('');

  const textareaRef = useRef(null);

  useEffect(() => {
    const newval = articles.join(' ');

    if (value !== newval && value[value.length - 1] !== ' ') {
      setValue(newval);
    }
  }, [articles]);

  const changeInputHandler = (e) => {
    setValue(e.target.value);
    const parseArticles = replaceInput(e.target.value);
    setArticles([...parseArticles]);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = '17px';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder="Введите артикулы"
      onChange={(e) => changeInputHandler(e)}
    />
  );
};

export default TextareaHeader;
