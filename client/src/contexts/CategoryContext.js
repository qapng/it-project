import { createContext, useReducer, useState } from 'react';
import { categoryReducer } from '../reducers/categoryReducer';
import {
  API_URL,
  CATEGORIES_LOADED_SUCCESS,
  CATEGORIES_LOADED_FAIL,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  FIND_CATEGORY,
  UPDATE_CATEGORY,
} from './constants';
import axios from 'axios';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  // State
  const [categoryState, dispatch] = useReducer(categoryReducer, {
    category: null,
    categories: [],
    categoriesLoading: true,
  });
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);

  // Get all categories
  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      if (response.data.success) {
        dispatch({
          type: CATEGORIES_LOADED_SUCCESS,
          payload: response.data.message.categories,
        });
      }
    } catch (error) {
      dispatch({ type: CATEGORIES_LOADED_FAIL });
    }
  };

  // Add category
  const addCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, newCategory);
      if (response.data.success) {
        dispatch({
          type: ADD_CATEGORY,
          payload: response.data.message.category,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/categories/${categoryId}`,
      );
      if (response.data.success)
        dispatch({ type: DELETE_CATEGORY, payload: categoryId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find category when user is updating category
  const findCategory = (categoryId) => {
    const category = categoryState.categories.find(
      (category) => category._id === categoryId,
    );
    dispatch({ type: FIND_CATEGORY, payload: category });
  };

  // Update category
  const updateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `${API_URL}/categories/${updatedCategory._id}`,
        updatedCategory,
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_CATEGORY,
          payload: response.data.message.category,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  // Category context data
  const categoryContextData = {
    categoryState,
    getCategories,
    showAddCategoryModal,
    setShowAddCategoryModal,
    addCategory,
    deleteCategory,
    updateCategory,
    findCategory,
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,
  };

  return (
    <CategoryContext.Provider value={categoryContextData}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
