import classes from './Panel.module.css';
import { Link } from 'react-router-dom';
import CategoryActionButtons from './CategoryActionButton';
export const CategoryPanel = ({ category: { _id, name, color } }) => {
  const bgCol = String(color);

  return (
    <div className={classes['btn-contact']}>
      <button
        className={classes['btn-primary']}
        style={{ backgroundColor: color }}
      >
        <div className={classes['btn-text']}>
          <p className={classes['btn-name']} style={{ display: 'inline' }}>
            {name} &emsp;
          </p>

          <p style={{ display: 'inline' }}>
            {/* {color} */}
            &emsp;
            <CategoryActionButtons _id={_id} />
          </p>
        </div>
      </button>
    </div>
  );
};
