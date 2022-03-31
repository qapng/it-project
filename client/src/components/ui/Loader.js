import { Spinner } from 'react-bootstrap';
import classes from './Loader.module.css';

function Loader() {
  return (
    <div className={classes.container}>
      <Spinner className={classes.loader} />
    </div>
  );
}

export default Loader;
