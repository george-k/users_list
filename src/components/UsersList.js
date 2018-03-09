import {chain} from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import store from 'store';

import {fetchUsers} from 'actions/main';

import {usersFetchStateSelector, usersSelector} from 'selectors/main';


class UserRecord extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const {item: {id, name}} = this.props;
    return (
      <NavLink to={`/users/${id}`}>
        {name}
      </NavLink>
    );
  }
}

class UsersList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchState: PropTypes.object.isRequired,
  }

  componentDidMount() {
    store.dispatch(fetchUsers());
  }

  renderItems() {
    const {items} = this.props;
    const list = chain(items).orderBy(['name'], ['asc']).map((item)=> (
      <li key={item.id}>
        <UserRecord item={item} />
      </li>
    )).value();
    return (
      <ul>{list}</ul>
    );
  }

  render() {
    const {fetchState: {isFetchFailed, isFetching}} = this.props;
    return isFetchFailed ? (
      <div>Users fetch failed...</div>
    ) : isFetching ? (
      <div>Loading, please wait...</div>
    ) : this.renderItems();
  }
}

export default connect((state)=> ({
  items: usersSelector(state),
  fetchState: usersFetchStateSelector(state),
}))(UsersList);
