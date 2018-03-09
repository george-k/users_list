export const currentUserSelector = (state)=> state.currentUser.data;
export const currentUserFetchStateSelector = ({
  currentUser: {
    isFetchFailed,
    isFetched,
    isFetching,
  },
})=> ({
  isFetchFailed,
  isFetched,
  isFetching,
});

export const usersFetchStateSelector = ({
  users: {
    isFetchFailed,
    isFetched,
    isFetching,
  },
})=> ({
  isFetchFailed,
  isFetched,
  isFetching,
});
export const usersSelector = (state)=> state.users.items;
