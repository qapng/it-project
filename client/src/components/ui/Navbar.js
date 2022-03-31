import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { useContext } from 'react';
import { ContactContext } from '../../contexts/ContactContext';
import { AuthContext } from '../../contexts/AuthContext';
import { CategoryContext } from '../../contexts/CategoryContext';
import SearchBar from './SearchBar';
import FilterBox from './FilterBox';

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showAllOpen, setShowAllOpen] = useState(false);
  const [addNewOpen, setAddNewOpen] = useState(false);
  const { logoutUser } = useContext(AuthContext);
  // Contexts
  const { setShowAddContactModal } = useContext(ContactContext);
  const { setShowAddCategoryModal } = useContext(CategoryContext);
  // Functions
  const handleClick = () => {
    setNavbarOpen(!navbarOpen);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };
  const openShowAll = () => {
    setShowAllOpen(!showAllOpen);
  };
  const closeShowAll = () => {
    setShowAllOpen(false);
  };
  const openAddNew = () => {
    setAddNewOpen(!addNewOpen);
  };
  const closeAddNew = () => {
    setAddNewOpen(false);
  };

  const logout = () => {
    closeMenu();
    logoutUser();
  };

  return (
    <nav className='navbar'>
      <div className='position'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            <i className='far fa-user-circle' />
          </Link>
          <div className='menu-icon' onClick={() => handleClick()}>
            {navbarOpen ? (
              <i className='fas fa-times' />
            ) : (
              <i className='fas fa-bars' />
            )}
          </div>
        </div>
        <ul className={`menu ${navbarOpen ? ' show-menu' : ''}`}>
          {/* <div className={'nav-item divider'} onClick={openShowAll}>
            {showAllOpen ? (
              <div className='nav-links header' onClick={() => closeShowAll()}>
                Show all...
              </div>
            ) : (
              <div>
                <div className={'nav-item divider'}>
                  <div
                    className='nav-links header'
                    onClick={() => closeShowAll()}
                  >
                    Show all..
                  </div>
                </div>
                <br />
                <div className={'nav-item'}>
                  <Link
                    to='/Contacts'
                    className='nav-links'
                    onClick={() => closeShowAll()}
                  >
                    By type
                  </Link>
                </div>
                <br />
                <div className={'nav-item'}>
                  <Link
                    to='/Contacts'
                    className='nav-links'
                    onClick={() => closeShowAll()}
                  >
                    By date
                  </Link>
                </div>
                <br />
                <div className={'nav-item '}>
                  <Link
                    to='/Contacts'
                    className='nav-links'
                    onClick={() => closeShowAll()}
                  >
                    By place
                  </Link>
                </div>
              </div>
            )}
          </div> */}
          <div className={'nav-item divider'} onClick={openAddNew}>
            {addNewOpen ? (
              <div className='nav-links header' onClick={() => closeAddNew()}>
                Add new...
              </div>
            ) : (
              <div>
                <div className={'nav-item divider'}>
                  <div
                    className='nav-links header'
                    onClick={() => closeAddNew()}
                  >
                    Add new..
                  </div>
                </div>
                <br />
                <div className={'nav-item'}>
                  <div
                    className='nav-links'
                    onClick={setShowAddCategoryModal.bind(this, true)}
                  >
                    Add Categories
                  </div>
                </div>
                <br />
                <div className={'nav-item'}>
                  <div
                    className='nav-links'
                    onClick={setShowAddContactModal.bind(this, true)}
                  >
                    Add Contact
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <li className={'nav-item divider'}>
            <Link
              to='/'
              className='nav-links header'
              onClick={() => closeMenu()}
            >
              Select
            </Link>
          </li> */}
          <li className={'nav-item divider'}>
            <Link
              to='/categories'
              className='nav-links header'
              onClick={() => closeMenu()}
            >
              Categories
            </Link>
          </li>
          <li className={'nav-item divider'}>
            <Link to='/login' className='nav-links header' onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
        <SearchBar />
        <FilterBox />
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <div
          className='addButton'
          onClick={setShowAddContactModal.bind(this, true)}
        >
          <i
            style={{ textAlign: 'right' }}
            className='fa fa-plus-circle '
            aria-hidden='true'
          ></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
