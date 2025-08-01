import axios from 'axios';

/**
 * Busca o MBID de um álbum via MusicBrainz API
 */
async function getAlbumMBID(
  artist: string,
  album: string,
): Promise<string | null> {
  const query = `artist:"${artist}" AND release:"${album}"`;
  const url = `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(
    query,
  )}&fmt=json`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'VLConect/1.0.0',
      },
    });

    const firstMatch = response.data.releases?.[0];

    return firstMatch?.id || null;
  } catch (error) {
    console.error('Error getting MBID for track:', error);
    return null;
  }
}

function getCoverUrlFromMBID(mbid: string): string {
  return `https://coverartarchive.org/release/${mbid}/front-500`;
}

export async function getAlbumCover(
  artist: string,
  album: string,
): Promise<string> {
  const mbid = await getAlbumMBID(artist, album);
  if (!mbid) {
    return '';
  }

  try {
    const meta = await axios.get(`https://coverartarchive.org/release/${mbid}`);

    if (meta.data?.images?.length === 0) {
      return '';
    }

    const imageMeta = await axios.head(getCoverUrlFromMBID(mbid), {
      maxRedirects: 5,
      validateStatus: status => status >= 200 && status < 400,
    });
    const finalURL = imageMeta.request?.responseURL || '';
    return finalURL;
  } catch (error) {
    console.warn('No image available for the album:', error);
    return '';
  }
}
