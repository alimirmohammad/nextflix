async function getVideos(queryParams) {
  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
  const FINAL_URL = `${BASE_URL}/${queryParams}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(FINAL_URL);
    const data = await response.json();

    if (!response.ok) throw data;

    return data.items.map((item) => ({
      id: typeof item.id === "string" ? item.id : item.id.videoId,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
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
