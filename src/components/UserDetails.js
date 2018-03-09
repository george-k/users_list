import {chain, isObject} from 'lodash';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import store from '../store';

import {clearCurrentUser, fetchUser} from '../actions/main';

import {
  currentUserFetchStateSelector,
  currentUserSelector,
} from '../selectors/main';


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

  render() {
    const {data, fetchState: {isFetchFailed, isFetching}} = this.props;
    if (isFetchFailed) {
      return (
        <div>User details fetch failed...</div>
      );
    } else if (isFetching) {
      return (
        <div>Loading, please wait...</div>
      );
    }
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
      </Fragment>
    );
  }
}

export default connect((state)=> ({
  data: currentUserSelector(state),
  fetchState: currentUserFetchStateSelector(state),
}))(UserDetails);
