import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

// sorting
const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 60,
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                // noramlized data - ids and entities
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        addNewNote: builder.mutation({
            query: (initialNoteData) => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNoteData
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),
        updateNote: builder.mutation({
            query: (initialNoteData) => ({
                url:'/notes',
                method: 'PATCH',
                body: {
                    ...initialNoteData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id}
            ]
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: '/notes',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id}
            ]
        })
    }),
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApiSlice

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// creates memoized selector - returns the normalized state object with ids and entities
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data
)


export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)