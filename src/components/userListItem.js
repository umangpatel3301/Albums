import { GoTrashcan } from "react-icons/go";
import { DeleteUser } from "../store";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import ExpandedPanel from "./expandedPanel";
import AlbumsList from "./albumsList";

function UserListItem({ user }) {
  const [doDeleteUser, isDeletingUser, DeletingUserError] =
    useThunk(DeleteUser);
  const handleClick = () => {
    doDeleteUser(user);
  };
  const header = (
    <>
      <Button
        danger
        rounded
        className="mr-3 "
        loading={isDeletingUser}
        onClick={handleClick}
      >
        <GoTrashcan />
      </Button>
      {DeletingUserError && <div>Error In Deleting User...</div>}
      {user.name}
    </>
  );
  return (
    <ExpandedPanel header={header}>
      <AlbumsList user={user} />
    </ExpandedPanel>
  );
}

export default UserListItem;
