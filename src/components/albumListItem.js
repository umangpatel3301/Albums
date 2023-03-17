import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandedPanel from "./expandedPanel";
import { useDeleteAlbumMutation } from "../store";

function AlbumListItem({ album }) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handlleDeleteAlbum = () => {
    deleteAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        loading={results.isLoading}
        danger
        rounded
        onClick={handlleDeleteAlbum}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandedPanel key={album.id} header={header}>
      List of photos
    </ExpandedPanel>
  );
}

export default AlbumListItem;
