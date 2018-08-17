import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';

import BookItem from '../widgetsUI/book_item';

class HomeContainer extends Component {

  componentWillMount() {
    this.props.getBooks(3, 0, 'desc');
  }

  renderItems = (books) => (
    books.list ?
      books.list.map(book => (
        <BookItem {...book} key={book._id}/>
      )) 
    : null 
  )

  loadMore = () => {
    let conunt = this.props.books.list.length;
    this.props.getBooks(1, conunt, 'desc', this.props.books.list);
  }

  render() { 
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div 
          className="loadmore"
          onClick={this.loadMore}
          >Load More</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, {getBooks})(HomeContainer);