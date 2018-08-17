import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItems = (props) => { 
  
  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: null
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Profile',
      link: '/user',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Admins',
      link: '/user/register',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Login',
      link: '/login',
      restricted: false,
      exclude: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My reviews',
      link: '/user/user-reviews',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add reviews',
      link: '/user/add',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Logout',
      link: '/user/logout',
      restricted: true
    }
  ]

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link} onClick={props.onHideNav}>
        <FontAwesome name={item.icon}/>
        {item.text}
      </Link>
    </div>
  )

  const showItems = () => (
    props.user.login ?
      items.map((item, i) => {
        if(props.user.login.isAuth) {
          return !item.exclude ?
            element(item, i)
          :null
        }else {
          return !item.restricted ?
            element(item, i)
          :null
        }
      })
    : null
  )

  return (
    <div>
      {showItems()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(SidenavItems);