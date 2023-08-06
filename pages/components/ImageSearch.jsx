import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageSearch() {
  const [photos, setPhotos] = useState(null);
  const [page, setPage] = useState(1);

  async function fetchImages(query, page) {
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

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    setPhotos(data.results);

    return photos;
  }

  function adjustPage(amount) {
    setPage((currentPage) => {
      return currentPage + amount;
    });
    console.log(page);
  }

  return (
    <div>
      <div className="form-group">
        <label htmlFor="searchbox"> Search for a Photo </label>
        <input
          className="input"
          type="text"
          placeholder="Search for your photo"
          id="searchbox"
          onKeyDown={()=>{fetchImages(document.getElementById("searchbox").value, page)}}
        />
      </div>

      <button
        className="button button-primary"
        type="button"
        onClick={() => {
          adjustPage(1);
          fetchImages(document.getElementById("searchbox").value, page);
        }}
      >
        Submit
      </button>
      { photos == null ? null : (
        <button
          className="button button-secondary"
          type="button"
          onClick={() => {
            adjustPage(1);
            fetchImages(document.getElementById("searchbox").value, page);
          }}
        >
          Next Page
        </button>
      )}

      { photos == null ? null : (
        <div className="grid">
          {photos.map((photo, idx) => {
            return (
              <div className="cs1 ce12" key={idx}>
                <Image
                  src={photo.urls.small_s3}
                  alt={photo.description}
                  width={200}
                  height={200}
                  draggable={true}
                  className="miro-draggable draggable-item"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
