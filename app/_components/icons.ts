interface LastUploaded {
  name: string;
  nameWithExtension: string;
  path: string;
  uploaded: string; // Assuming this is a timestamp string
  size: number;
}

export interface Image {
  name: string;
  nameWithExtension: string;
  path: string;
  uploaded: string; // Assuming this is a timestamp string
  size: number;
}

export interface ApiResponse {
  success: boolean;
  status: string;
  path: string;
  game: string;
  asset: string;
  lastUploaded: LastUploaded;
  images: Image[];
}

export async function fetchImages(iconType: string): Promise<Image[]> {
  const url = `https://api.wanderer.moe/game/genshin-impact/${iconType}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    // Assuming that the 'images' property is an array of Image objects
    return data.images;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
