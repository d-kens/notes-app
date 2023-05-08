import { useGetUsersQuery } from "./usersApiSlice"

const UserList = () => {
  const { 
    data: users,
    isLoading,
    isSuccess,
    isError, 
    error
  } = useGetUsersQuery();

  let content

  if (isLoading) content = <p>loading.....</p>

  if (isError) {
    content = <p className="errmsg">
      {error?.data?.message}
    </p>
  }

  if (isSuccess) {
    const { ids } = users
  }

  console.log(users)

  return (
    <div>
        user list
    </div>
  )
}

export default UserList