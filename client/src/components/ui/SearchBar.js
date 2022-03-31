import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  let history = useHistory();
  const [search, setSearch] = useState({
    searchValue: '',
    searchParam: 'name',
  });

  const { searchValue, searchParam } = search;

  const onChangeSearchBar = (event) =>
    setSearch({ ...search, [event.target.name]: event.target.value });

  const resetSearchData = () => {
    setSearch({ ...search, [searchValue]: '' });
  };

  const onSubmit = () => {
    event.preventDefault();
    const searchString = `?${searchParam}=${searchValue}`;
    history.push(`/${searchString}`);
  };

  return (
    <>
      <div className =  'searchbar'>
        <Form className='form' onSubmit={onSubmit}> 
        <Form.Group>
            <Form.Control
              type="text"
              placeholder='Type Here..'       
              className='form-control'
              name='searchValue'
              required
              value={searchValue}
              onChange={onChangeSearchBar}

            />
          </Form.Group>
        </Form>
        <Form.Group>
            <Form.Control
              as='Select'
              defaultValue='name'
              name='searchParam'
              value={searchParam}
              className = "searchChoice"
              onChange={onChangeSearchBar}
            >
              <option value='name'> Name </option>
              <option value='email'> Email </option>
              <option value='phoneNumber'> Phone Number </option>
            </Form.Control>
          </Form.Group>
      </div>
      <Form className='form' onSubmit={onSubmit}> 
      <button type = "submit" className='fa fa-search icon fa-flip-horizontal'/>
      </Form>
    </>
  );
};

export default SearchBar;
