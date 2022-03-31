import Alert from 'react-bootstrap/Alert';
import classes from './AlertMessage.module.css';

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <div className={classes.container}>
      <Alert variant={info.type} className={classes.alertBox}>
        {info.message}
      </Alert>
    </div>
  );
};

export default AlertMessage;
