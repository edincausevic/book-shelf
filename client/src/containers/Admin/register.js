import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

class Register extends PureComponent {

  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
  }

  componentWillMount() {
    this.props.getUsers();
  }

  handleInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.register === false) {
      this.setState({error: 'Error, try again.'})
    }else {
      this.setState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
      })
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    this.setState({error: ''});

    this.props.userRegister({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      lastname: this.state.lastname
    }, this.props.user.users);
  }

  showUsers = (user) => (
    user.users ? 
      user.users.map(item => (
        <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.lastname}</td>
          <td>{item.email}</td>
        </tr>
      ))
    :null
  )

  render() { 
    let user = this.props.user;

    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Add User</h2>

          <div className="form_element">
            <input 
              type="text"
              name="name"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.handleInputs}/>
          </div>
          <div className="form_element">
            <input 
              type="text"
              name="lastname"
              placeholder="Enter Lastname"
              value={this.state.lastname}
              onChange={this.handleInputs}/>
          </div>
          <div className="form_element">
            <input 
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputs}/>
          </div>
          <div className="form_element">
            <input 
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputs}/>
          </div>
          <button type="submit">Add User</button>
          <div className="error">
            {this.state.error}
          </div>
        </form>
        <div className="current_users">
          <h4>Current users:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.showUsers(user)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {getUsers, userRegister})(Register);