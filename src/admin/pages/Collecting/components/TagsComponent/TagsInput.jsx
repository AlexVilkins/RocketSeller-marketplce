import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Chip } from '@mui/material';

import styles from './TagsInput.module.scss';

export default function TagsInput({ ...props }) {
  const { tags, setArticles } = props;
  const [selectedItem, setSelectedItem] = React.useState([]);

  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    setArticles(tags.filter((tag) => tag !== item));
  };

  return (
    <React.Fragment>
      {selectedItem.length > 0 && (
        <div className={styles.chipsContainer}>
          {selectedItem.map((item) => (
            <Chip
              key={item}
              tabIndex={-1}
              label={item}
              className={styles.chip}
              size="small"
              onDelete={handleDelete(item)}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

TagsInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};
