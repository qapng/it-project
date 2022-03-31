import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';
import { useEffect, useContext } from 'react';
import Loader from '../components/ui/Loader';
import CategoriesList from '../components/categories/CategoryList';
import { Button } from 'react-bootstrap';
import { CategoryContext } from '../contexts/CategoryContext';
import AddCategoryModal from '../components/categories/AddCategoryModal';
import UpdateCategoryModal from '../components/categories/UpdateCategoryModal';
import AddContactModal from '../components/contacts/AddContactModal';

function CategoriesPage() {
  // Contexts
  const {
    categoryState: { categories, categoriesLoading, category },
    getCategories,
    setShowAddCategoryModal,
  } = useContext(CategoryContext);

  // Get all categories
  useEffect(() => getCategories(), []);

  let body = null;
  if (categoriesLoading) {
    body = <Loader />;
  } else if (categories.length === 0) {
    body = <h1>No categories found</h1>;
  } else {
    body = <CategoriesList categories={categories} />;
  }

  return (
    <>
      <div style={{ float: 'left' }}>
        {body}
        <AddContactModal categories={categories} />
        <AddCategoryModal />
        {category !== null && <UpdateCategoryModal />}
      </div>
      <div style={{ whiteSpace: 'nowrap' }}>
        <Sidebar style={{ display: 'inline' }} />
      </div>
    </>
  );
}

export default CategoriesPage;
