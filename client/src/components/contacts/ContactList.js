import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Panel } from './Panel';

function ContactsList(props) {
  const findCategory = (catName) => {
    let obj = props.categories.find((cat) => cat.name === catName);

    if (obj === undefined) {
      obj = {
        name: 'default',
        color: '#FFFFFF',
      };
    }

    return obj;
  };

  return (
    <Row className='row-cols-1'>
      {props.contacts.map((contact) => (
        <Col key={contact._id} className='my-2'>
          <Panel contact={contact} category={findCategory(contact.category)} />
        </Col>
      ))}
    </Row>
  );
}

export default ContactsList;
