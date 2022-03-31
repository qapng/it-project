import Button from 'react-bootstrap/Button';
import editIcon from '../../assets/pen.svg';
import deleteIcon from '../../assets/trash.svg';
import { CategoryContext } from '../../contexts/CategoryContext';
import { useContext } from 'react';

const CategoryActionButtons = ({ _id }) => {
  const { deleteCategory, findCategory, setShowUpdateCategoryModal } =
    useContext(CategoryContext);

  const getCategory = (categoryId) => {
    findCategory(categoryId);
    setShowUpdateCategoryModal(true);
  };

  return (
    <>
      <Button onClick={getCategory.bind(this, _id)}>
        <img src={editIcon} alt='edit' width='24' height='24' />
      </Button>
      <Button onClick={deleteCategory.bind(this, _id)}>
        <img src={deleteIcon} alt='delete' width='24' height='24' />
      </Button>
    </>
  );
};

export default CategoryActionButtons;
