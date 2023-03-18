import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photoApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchPhoto: builder.query({
        providesTags: (result, error, album) => {
          const tag = result.map((photo) => {
            return { type: "photo", id: photo.id };
          });
          tag.push({ type: "AlbumPhoto", id: album.id });
          return tag;
        },
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [
            {
              type: "AlbumPhoto",
              id: album.id,
            },
          ];
        },
        query: (album) => {
          return {
            url: "/photos",
            method: "POST",
            body: {
              albumId: album.id,
              title: faker.name.firstName,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      deletePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [
            {
              type: "photo",
              id: photo.id,
            },
          ];
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotoQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photoApi;
export { photoApi };
