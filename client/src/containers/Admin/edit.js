import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions';

class EditBook extends PureComponent {

  state = {
    formdata: {
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.updateBook(this.state.formdata);
  }

  handleInput = (e) => {
    const newFormData = { ...this.state.formdata }
    newFormData[e.target.name] = e.target.value;
    this.setState({formdata: newFormData})
  }

  deletePost = () => {
    this.props.deleteBook(this.props.match.params.id);
  }

  redirectUser = () => {
    setTimeout(() => {
      this.props.history.push('/user/user-reviews')
    }, 1000);
  }

  componentWillMount() {
    this.props.getBook(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearBook();
  }

  componentWillReceiveProps(nextProps) {
    let book = nextProps.books.book;
    this.setState({
      formdata: {
        _id: book._id,
        name: book.name,
        author: book.author,
        review: book.review,
        pages: book.pages,
        rating: book.rating,
        price: book.price
      }
    });
  }

  render() { 
    let data = this.state.formdata;
    let books = this.props.books;

    return (
      <div className="rl_container article">
      {
        books.updateBook ?
          <div className="edit_confirm">
            Post Updated ,  
            <Link to={`/books/${books.book._id}`}>
              Click here to see your post
            </Link>
          </div>
        :null
      }
      {
        books.postDeleted ?
          <div className="red_tag">
          Post Deleted
          {this.redirectUser()}
          </div>
        :null
      }
        <form onSubmit={this.submitForm}>
          <h2>Edit a review</h2>
          <div className="form_element">
            <input 
              type="text"
              name="name"
              placeholder="Enter name"
              value={data.name}
              onChange={(e) => this.handleInput(e)}/>
          </div>
          <div className="form_element">
            <input 
              type="text"
              name="author"
              placeholder="Enter author"
              value={data.author}
              onChange={(e) => this.handleInput(e)}/>
          </div>
          <div className="form_element">
            <textarea 
              name="review"
              value={data.review}
              onChange={(e) => this.handleInput(e)}></textarea>
          </div>
          <div className="form_element">
            <input 
              type="number"
              name="pages"
              placeholder="Enter pages"
              value={data.pages}
              onChange={(e) => this.handleInput(e)}/>
          </div>
          <div className="form_element">
            <select
              value={data.rating}
              name="rating"
              onChange={(e) => this.handleInput(e)}
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input 
              type="number"
              name="price"
              placeholder="Enter Price"
              value={data.price}
              onChange={(e) => this.handleInput(e)}/>
          </div>

          <button type="submit">Edit review</button>
          <div className="delete_post">
            <div className="button"
              onClick={this.deletePost}
            >
              Delete review
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, {getBook, updateBook, deleteBook, clearBook})(EditBook);