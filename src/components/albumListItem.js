import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandedPanel from "./expandedPanel";
import { useDeleteAlbumMutation } from "../store";
import PhotoList from "./photoList";

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
      <PhotoList album={album} />
    </ExpandedPanel>
  );
}

export default AlbumListItem;
