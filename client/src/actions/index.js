import axios from 'axios';

export function getBooks(
  limit = 10, 
  start = 0, 
  order = 'asc',
  list = ''
) {
  
  const request = `/api/books?limit=${limit}&skip=${start}&order=${order}`;
  const response = axios.get(request).then((res) => {
    if(list) {
      return [...list, ...res.data]
    }else {
      return res.data;
    }
  })

  return {
    type: 'GET_BOOKS',
    payload: response
  }
}

export function getBookWithReviewer(id) {

  const request = axios.get(`/api/getBook?id=${id}`);

  return (dispatch) => {
    request.then(({data}) => {
      let book = data;

      axios.get(`/api/getReviewer?id=${book.ownerId}`)
        .then(({data}) => {
          let response = {
            book,
            reviewer: data
          }
          
          dispatch({
            type: 'GET_BOOK_W_REVIEWER',
            payload: response
          })
        })
    })
  }
}

export function clearBookWithReviewer() {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {}
    }
  }
}

export function addBook(book) {
  const request = axios.post('/api/book', book)
                    .then(res => res.data);
  return {
    type: 'ADD_BOOK',
    payload: request
  }
}

export function clearNewBook() {
  return {
    type: 'CLEAR_NEWBOOK',
    payload: {}
  }
}

export function getUserPosts(userId) {
  let request = axios.get(`/api/user_posts?user=${userId}`)
    .then(res => res.data);

  return {
    type: 'GET_USER_POSTS',
    payload: request
  }
}

export function getBook(id) {
  const request = axios.get(`/api/getBook?id=${id}`)
              .then(res => res.data);
  
  return {
    type: 'GET_BOOK',
    payload: request
  }
}

export function updateBook(data) {
  const request = axios.post(`/api/book_update`, data)
    .then(res => res.data);

  return {
    type: 'UPDATE_BOOK',
    payload: request
  }
}

export function deleteBook(id) {
  const request = axios.delete(`/api/delete_book?id=${id}`)
    .then(res => res.data);

  return {
    type: 'DELETE_BOOK',
    payload: request
  }
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: null,
      updateBook: false,
      postDeleted: false
    }
  }
}


/*-------- USER ------------*/

export function loginUser({email, password}) {
  const request = axios.post(`/api/login`, {email, password})
                  .then(res => res.data);
  
  return {
    type: 'USER_LOGIN',
    payload: request
  }
}

export function auth() {
  const request = axios.get('/api/auth')
                    .then(res => res.data);

  return {
    type: 'USER_AUTH',
    payload: request
  }
}

export function getUsers() {
  const request = axios.get('/api/users')
                    .then(res => res.data);

  return {
    type: 'GET_USERS',
    payload: request
  }
}

export function userRegister(user, userList) {
  const request = axios.post(`/api/register`, user)

  return (dispatch) => {
    request.then(({data}) => {
      let users = data.success ? [...userList, data.user] : userList
      let response = {
        success: data.success,
        users: users
      }
      dispatch({
        type: 'USER_REGISTER',
        payload: response
      })
    })
  }
}