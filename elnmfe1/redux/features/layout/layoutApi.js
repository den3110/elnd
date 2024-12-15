import { apiSlice } from "../api/apiSlice"

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getHeroData: builder.query({
      query: type => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include"
      })
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `edit-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories
        },
        method: "PUT",
        credentials: "include"
      })
    }),
    deleteLayout: builder.mutation({
      query: ({ type, title }) => ({
        url: `delete-layout/${type}/${title}`,
        
        method: "DELETE",
        credentials: "include"
      })
    }),
  })
})

export const { useGetHeroDataQuery, useEditLayoutMutation, useDeleteLayoutMutation } = layoutApi
