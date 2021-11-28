const baseUrl = 'https://youtube.googleapis.com/youtube/v3';

const buildAPIRequest = (method, path, params) => {
  const requestOptions = {
    method,
    redirect: 'follow',
  };

  let url;
  try {
    url = buildAPIUrl(path, params);
  } catch (err) {
    console.error(err);
  }

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

const buildAPIUrl = (path, params) => {
  let url = `${baseUrl}${path}?`;
  Object.entries(params).forEach(([key, value]) => {
    if (!key || !value) return;
    url += `&${key}=${value}`;
  });
  if (url) return `${url}&key=${process.env.REACT_APP_YOUTUBE_API}`;
  else throw new Error('Failed to build request url');
};

const parseVideoData = async (result) => {
  const nextPageToken = result.nextPageToken;
  const videoList = await Promise.all(
    result.items
      .map((video) => {
        const videoId =
          typeof video.id === 'string'
            ? video.id
            : typeof video.id.videoId === 'string'
            ? video.id.videoId
            : undefined;
        const { title, description, thumbnails, channelTitle } = video.snippet;
        return {
          id: videoId,
          title,
          description,
          thumbnail: thumbnails.high.url,
          channelTitle,
        };
      })
      .filter((video) => video.id)
  );

  return { nextPageToken, videoList };
};

export const fetchPopularVideo = async ({ pageToken }, maxResults = 24) => {
  const result = await buildAPIRequest('GET', '/videos', {
    part: 'id, snippet',
    chart: 'mostPopular',
    maxResults,
    fields:
      'nextPageToken, items(id, snippet(title, description, thumbnails(high(url)), channelTitle))',
    pageToken,
    regionCode: 'KR',
  });

  return await parseVideoData(result);
};

export const fetchSearchedVideo = async (
  { q, publishedBefore, pageToken },
  maxResults = 24
) => {
  if (!q || !publishedBefore)
    throw new Error(
      `There is missing params to load popular video - q: ${q}, publishedBefore: ${publishedBefore}`
    );

  const result = await buildAPIRequest('GET', '/search', {
    part: 'id, snippet',
    maxResults,
    q,
    fields:
      'nextPageToken, items(id, snippet(title, description, thumbnails(high(url)), channelTitle))',
    order: 'date',
    pageToken,
    publishedBefore,
  });

  return await parseVideoData(result);
};
