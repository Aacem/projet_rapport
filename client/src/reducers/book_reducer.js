const addBookReducer = (state = { bookItems: [] }, action) => {
    switch (action.type) {
      case 'ADD_BOOK_REQUEST':
        return { ...state, loading: true };
      case 'ADD_BOOK_SUCCESS':
        return {
          ...state,
          bookItems: [...state.bookItems, action.payload],
          loading: false,
        };
      case 'EDIT_BOOK_SUCCESS':
        // Update the bookItems array with the edited book
        const updatedBook = action.payload;
        const updatedBookItems = state.bookItems.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        );
        return { ...state, bookItems: updatedBookItems };
      default:
        return state;
    }
  };
  
  const getAllBookReducer = (state = { books: [] }, action) => {
    switch (action.type) {
      case 'GET_BOOKS_REQUEST':
        return { ...state, loading: true };
      case 'GET_BOOKS_SUCCESS':
        return {
          books: action.payload,
          loading: false,
        };
      case 'GET_BOOKS_FAILED':
        return { error: action.payload, loading: false };
      case 'EDIT_BOOK_REQUEST':
        return { ...state, loading: true };
      case 'EDIT_BOOK_FAILED':
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export { addBookReducer, getAllBookReducer };