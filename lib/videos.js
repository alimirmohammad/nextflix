import dummyVideosData from "../data/videos.json";

async function fetchVideosData(queryParams) {
  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
  const FINAL_URL = `${BASE_URL}/${queryParams}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`;
  const response = await fetch(FINAL_URL);
  const data = await response.json();

  if (!response.ok) throw data;
  return data;
}

async function getVideos(queryParams) {
  try {
    const data =
      process.env.NODE_ENV === "development"
        ? dummyVideosData
        : await fetchVideosData(queryParams);

    return data.items.map((item) => ({
      id: typeof item.id === "string" ? item.id : item.id.videoId,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      publishTime: item.snippet.publishedAt,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount ?? 0,
    }));
  } catch (e) {
    console.error(e, "There is something wrong with videos library!");
    return [];
  }
}

export async function getVideosByQuery(searchQuery) {
  const queryParams = `search?part=snippet&q=${encodeURIComponent(
    searchQuery
  )}`;
  return getVideos(queryParams);
}

export async function getPopularVideos(regionCode = "US") {
  const queryParams = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=${regionCode}`;
  return getVideos(queryParams);
}

export async function getVideosById(id) {
  const queryParams = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
  const results = await getVideos(queryParams);
  return results[0] ?? {};
}
