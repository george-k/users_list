export const currentUserSelector = (state)=> state.currentUser.data;
export const currentUserFetchStateSelector = ({
  currentUser: {
    isFetched,
    isFetching,
  },
})=> ({
  isFetched,
  isFetching,
});

export const usersFetchStateSelector = ({users: {isFetched, isFetching}})=> ({
  isFetched,
  isFetching,
});
export const usersSelector = (state)=> state.users.items;
