import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { CategoryContext } from '../../contexts/CategoryContext';
import './FilterBox.css';

const FilterBox = () => {
  let history = useHistory();
  const [filter, setFilter] = useState([]);
  const {
    categoryState: { categories },
  } = useContext(CategoryContext);

  const onChangeFilterVal = (event) => {
    const selected = [];
    for (let index = 0; index < event.length; index++) {
      selected.push(event[`${index}`].name);
    }
    setFilter(selected);
  };

  const onSubmit = () => {
    event.preventDefault();
    const filterParam = filter
      .toString()
      .replaceAll(',', '+')
      .replaceAll(' ', '-');
    const searchString = `?category=${filterParam}`;
    history.push(`/${searchString}`);
  };

  return (
    <>
      <Form className='form categoriesChoice' onSubmit={onSubmit}>
        <Form.Group>
          <Multiselect
            placeholder = "Categories.."
            options={categories}
            displayValue={'name'}
            showCheckbox={true}
            onSelect={onChangeFilterVal}
            onRemove={onChangeFilterVal}
            />
        </Form.Group>
      </Form>
      <Form className='form ' onSubmit={onSubmit}>
        <Button type='submit' className = 'filtercfm'> Filter</Button>
      </Form>
    </>
  );
};

export default FilterBox;
