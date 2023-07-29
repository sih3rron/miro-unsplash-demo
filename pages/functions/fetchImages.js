export default async function fetchImages(query, page) {
  const URL = "https://api.unsplash.com/";
  const HEADERS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  };

  const res = await fetch(
    `${URL}/search/photos?page=${page}&query=${query}`,
    HEADERS
  );

  return console.log(res.json());
}
