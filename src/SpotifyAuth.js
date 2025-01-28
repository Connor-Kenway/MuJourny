import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const SpotifyAuth = ({ onAuthSuccess }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const accessToken = params.get('access_token');

    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      onAuthSuccess(spotifyApi);
    }
  }, [onAuthSuccess]);

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent('http://localhost:3000/callback');
    const scopes = encodeURIComponent('playlist-modify-public playlist-modify-private');
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLogin}>Log in to Spotify</button>
  );
};

export default SpotifyAuth;