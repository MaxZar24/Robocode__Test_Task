import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const leadsApi = createApi({
    reducerPath: 'leadsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://66d058f0181d059277de33d5.mockapi.io/' }),
    endpoints: (builder) => ({
        getLeads: builder.query({
            query: () => 'leads',
        }),
        createLead: builder.mutation({
            query: (newLead) => ({
                url: 'leads',
                method: 'POST',
                body: newLead,
            }),
        }),
        deleteLead: builder.mutation({
            query: (id) => ({
                url: `leads/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetLeadsQuery, useCreateLeadMutation, useDeleteLeadMutation } = leadsApi;
