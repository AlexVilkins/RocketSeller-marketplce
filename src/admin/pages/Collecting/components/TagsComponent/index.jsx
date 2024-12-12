import PropTypes from 'prop-types';

import TagsInput from './TagsInput';
import styles from './TagsInput.module.scss';

const TagsComponent = ({ articles, setArticles }) => {
  return (
    <>
      {articles.length > 0 && (
        <div className={styles.chipsContainerWrapper}>
          <TagsInput
            tags={articles}
            setArticles={setArticles}
            variant="outlined"
            id="tags"
            name="tags"
            label="Найденные артикулы"
            disabled
          />
        </div>
      )}
    </>
  );
};

TagsComponent.propTypes = {
  articles: PropTypes.array,
};

export default TagsComponent;
