import { useFetchPhotoQuery, useAddPhotoMutation } from "../store";
import Skeleton from "./skeleton";
import Button from "./Button";
import PhotoListItem from "./photoListItem";

function PhotoList({ album }) {
  const { data, isFetching, error } = useFetchPhotoQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();
  const handleAddPhoto = () => {
    addPhoto(album);
  };
  let content;
  if (isFetching) {
    content = <Skeleton times={4} className="h-8 w-8" />;
  } else if (error) {
    content = <div>Photo Fetching Error</div>;
  } else {
    content = data.map((photos) => {
      return <PhotoListItem key={photos.id} photo={photos} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-2 items-center">
        <h3 className="text-lg font-bold">Photos for {album.title}</h3>

        <Button primary loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Album
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {" "}
        {content}
      </div>
    </div>
  );
}

export default PhotoList;
