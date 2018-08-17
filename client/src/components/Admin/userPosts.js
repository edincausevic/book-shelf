import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class UserPosts extends Component {

  componentWillMount() {
    this.props.getUserPosts(this.props.user.login.id);
  }

  showUserPosts = (user) => (
    user.userPosts ?
      user.userPosts.map(item => (
        <tr key={item._id}>
          <td>
            <Link 
              to={`/user/edit-post/${item._id}`}
              className="link">
              {item.name}</Link>
            </td>
          <td>{item.author}</td>
          <td>
            {moment(item.createdAt).format("MM/DD/YY")}
          </td>
        </tr>
      ))
    :null
  )

  render() { 
    let user = this.props.user;

    return (
      <div className="user_posts">
        <h4>Your reviwes:</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.showUserPosts(user)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {getUserPosts})(UserPosts);