import { useDeletePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";

function PhotoListItem({ photo }) {
  const [deletePhoto] = useDeletePhotoMutation();
  const handlleDeletePhoto = () => {
    deletePhoto(photo);
  };

  return (
    <div onClick={handlleDeletePhoto} className="relative m-2 cursor-pointer">
      <img className="h-20 w-20" src={photo.url} alt={photo.title} />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
}

export default PhotoListItem;
