import CollectingContent from '@admin/widgets/CollectingContent/CollectingContent';
import CollectingHeader from '@admin/widgets/CollectingHeader/ui/CollectingHeader';
import SessionsList from '@admin/widgets/SessionsList/SessionsList';
import styles from './Collecting.module.scss';

const Collecting = () => {
  console.log('render sessions page');
  return (
    <div className={styles.container}>
      <CollectingHeader />
      <SessionsList />
      <CollectingContent />
    </div>
  );
};

export default Collecting;
