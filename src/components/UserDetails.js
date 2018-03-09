import {chain, isObject} from 'lodash';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import store from 'store';

import {clearCurrentUser, fetchUser} from 'actions/main';

import {
  currentUserFetchStateSelector,
  currentUserSelector,
} from 'selectors/main';


class UserDetails extends Component {
  static propTypes = {
    data: PropTypes.object,
    fetchState: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    data: null,
  }

  componentDidMount() {
    const {match: {params: {userId}}} = this.props;
    store.dispatch(fetchUser(userId));
  }

  componentWillUnmount() {
    store.dispatch(clearCurrentUser());
  }

  renderDetails() {
    const {data} = this.props;
    const rows = chain(data).toPairs().orderBy(
      [(key)=> key], ['asc'],
    ).map(([key, value])=> (
      <div key={key}>
        <span>{key}</span>:&nbsp;
        <span>{isObject(value) ? JSON.stringify(value) : value}</span>
      </div>
    )).value();
    return (
      <Fragment>
        {rows}
        <br />
        <NavLink to="/users">Back to users list</NavLink>
      </Fragment>
    );
  }

  render() {
    const {fetchState: {isFetchFailed, isFetching}} = this.props;
    return isFetchFailed ? (
      <div>User details fetch failed...</div>
    ) : isFetching ? (
      <div>Loading, please wait...</div>
    ) : this.renderDetails();
  }
}

export default connect((state)=> ({
  data: currentUserSelector(state),
  fetchState: currentUserFetchStateSelector(state),
}))(UserDetails);
