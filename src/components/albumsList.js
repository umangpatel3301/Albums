import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./skeleton";
import Button from "./Button";
import AlbumListItem from "./albumListItem";

function AlbumsList({ user }) {
  const { data, isLoading, error } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };
  let content;
  if (isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error in Fetching Albums...</div>;
  } else {
    content = data.map((albums) => {
      return <AlbumListItem key={albums.id} album={albums} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-2 items-center">
        <h3 className="text-lg font-bold">Album for {user.name}</h3>

        <Button primary loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      {content}
    </div>
  );
}
export default AlbumsList;
