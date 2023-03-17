import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./skeleton";
import Button from "./Button";
import { addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import UserListItemS from "./userListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUserError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);
  const handleClickAdd = () => {
    doCreateUser();
  };
  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUserError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UserListItemS key={user.id} user={user} />;
    });
  }
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button primary loading={isCreatingUser} onClick={handleClickAdd}>
          + Add User
        </Button>
        {creatingUserError && "Error Creating User"}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
