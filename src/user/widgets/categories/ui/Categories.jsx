import { ProgressComponent } from '@shared/ui';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import { getCategories } from '../api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setCategories([]);
        enqueueSnackbar('Ошибка получения категорий', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (isLoading) {
    return <ProgressComponent title="Загрузка" />;
  }

  // if (error) {
  //   return <div>Ошибка: {error.message}</div>;
  // }

  return (
    <div>
      {categories.length > 0
        ? categories.map((category) => (
            <div key={category.id}>{category.name}</div>
          ))
        : null}
    </div>
  );
};

export default Categories;
