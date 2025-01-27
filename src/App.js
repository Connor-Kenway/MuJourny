import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import JournalEntry from './JournalEntry';
import SpotifyAuth from './SpotifyAuth';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const EntryList = styled.div`
  width: 100%;
  max-width: 600px;
`;

const AddEntryButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [entries, setEntries] = useState([]);
  const [spotifyApi, setSpotifyApi] = useState(null);

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date(),
      content: '',
      mood: '',
    };
    setEntries([newEntry, ...entries]);
  };

  const updateEntry = (id, content, mood) => {
    setEntries(entries.map(entry => entry.id === id ? { ...entry, content, mood } : entry));
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const createPlaylist = async (mood) => {
    if (!spotifyApi) {
      alert('Please log in to Spotify first.');
      return;
    }

    try {
      const userId = (await spotifyApi.getMe()).id;
      const playlist = await spotifyApi.createPlaylist(userId, {
        name: `My ${mood} Playlist - ${format(new Date(), 'MMMM do, yyyy')}`,
        public: true,
      });

      const moodTracks = {
        Happy: ['0RH319xCjeU8VyTSqCF6M4'], // Happy songs
        Sad: ['5DVUEqRL1EV8I9n65eBaAw'], // Sad Songs
        Energetic: ['7DgPQwzEoUVfQYBiMLER9Z'], // Rock, EDM
        Calm: ['0vvXsWCC9xrXsKd4FyS8kM'], // Lofi
        Angry: ['07JztNEdtMFhc6hoLzQLsH'], // Metal, Punk
      };

      const tracks = await spotifyApi.getPlaylistTracks(moodTracks[mood][0]);
      const trackUris = tracks.items.map(track => track.track.uri);
  
      await spotifyApi.addTracksToPlaylist(playlist.id, trackUris);
      alert(`Playlist created: ${playlist.name}`);
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert('Failed to create playlist. Please try again.');
    }
  };

  return (
    <AppContainer>
      <Title>My Journal</Title>
      <EntryList>
        {entries.map(entry => (
          <JournalEntry
            key={entry.id}
            entry={entry}
            updateEntry={updateEntry}
            deleteEntry={deleteEntry}
            createPlaylist={createPlaylist}
          />
        ))}
      </EntryList>
      <AddEntryButton onClick={addEntry}>Add New Entry</AddEntryButton>
      {!spotifyApi && <SpotifyAuth onAuthSuccess={setSpotifyApi} />}
    </AppContainer>
  );
}

export default App;