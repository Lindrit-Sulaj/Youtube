import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-v31.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '1d72593178msh246ea6fe23a59c0p1e310djsn052d76a19211');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSuggestedVideos: builder.query({ query: (relatedVideo) => `/search?relatedToVideoId=${relatedVideo}&part=id%2Csnippet&type=video&maxResults=50`}),
    getSearchResults: builder.query({ query: (query) => `/search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`}),
    getVideoComments: builder.query({ query: (videoId) => `/commentThreads?part=snippet&videoId=${videoId}&maxResults=100`}),
    getVideoDetails: builder.query({ query: (videoId) => `/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}` }),
    getChannelDetails: builder.query({ query: (channelId) => `/channels?part=snippet%2Cstatistics&id=${channelId}`}),
    getChannelVideos: builder.query({ query: (channelId) => `/search?channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=50`}),
    getPlaylistVideos: builder.query({ query: (playlistId) => `/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=50`}),
    getPlaylistDetails: builder.query({ query: (playlistId) => `/playlists?id=${playlistId}&part=snippet`}),
  }),
});

export const { 
  useGetSuggestedVideosQuery,
  useGetSearchResultsQuery,
  useGetVideoCommentsQuery,
  useGetVideoDetailsQuery,
  useGetChannelDetailsQuery,
  useGetChannelVideosQuery,
  useGetPlaylistDetailsQuery,
  useGetPlaylistVideosQuery,
} = youtubeApi;