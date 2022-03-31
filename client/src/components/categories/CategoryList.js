import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { CategoryPanel } from './CategoryPanel';

function CategoriesList(props) {
  return (
    <Row className='row-cols-1'>
      {props.categories.map((category) => (
        <Col key={category._id} className='my-2'>
          <CategoryPanel category={category} />
        </Col>
      ))}
    </Row>
  );
}

export default CategoriesList;
