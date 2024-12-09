import { apiSlice } from "../api/apiSlice"

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllOrders: builder.query({
      query: type => ({
        url: `get-orders`,
        method: "GET",
        credentials: "include"
      })
    }),
    getStripePublishablekey: builder.query({
      query: () => ({
        url: `payment/stripepublishablekey`,
        method: "GET",
        credentials: "include"
      })
    }),
    createPaymentIntent: builder.mutation({
      query: amount => ({
        url: "payment",
        method: "POST",
        body: {
          amount
        },
        credentials: "include"
      })
    }),
    createOrder: builder.mutation({
      query: ({ courseId }) => ({
        url: "create-order",
        body: {
          courseId
        },
        method: "POST",
        credentials: "include"
      })
    })
  })
})

export const {
  useGetAllOrdersQuery,
  useGetStripePublishablekeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation
} = ordersApi
