export default async function getVideos(searchQuery) {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(
        searchQuery
      )}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) throw data;

    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
    }));
  } catch (e) {
    console.error(e, "There is something wrong with videos library!");
    return [];
  }
}
