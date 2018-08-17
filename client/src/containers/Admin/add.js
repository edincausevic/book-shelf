import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

class AddBook extends Component {

  state = {
    formdata: {
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
    this.props.addBook({
      ...this.state.formdata,
      ownerId: this.props.user.login.id
    });
  }

  handleInput = (e) => {
    const newFormData = { ...this.state.formdata }
    newFormData[e.target.name] = e.target.value;
    this.setState({formdata: newFormData})
  }

  showNewBook = (book) => (
    book.post ?
      <div className="conf_link">
        Success! <Link to={`/books/${book.bookId}`}>
          Click the link to see the post
        </Link>
      </div>
    :null
  )

  componentWillUnmount() {
    this.props.clearNewBook();
  }

  render() {
    let data = this.state.formdata;

    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a review</h2>
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

          <button type="submit">Add review</button>

          {
            this.props.books.newbook ?
              this.showNewBook(this.props.books.newbook)
            :null
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, {addBook, clearNewBook})(AddBook);