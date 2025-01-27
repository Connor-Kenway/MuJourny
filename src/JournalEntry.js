import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const EntryContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const EntryDate = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #cc0000;
  }
`;

const EntryTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;

const MoodSelect = styled.select`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CreatePlaylistButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

function JournalEntry({ entry, updateEntry, deleteEntry, createPlaylist }) {
  const [content, setContent] = useState(entry.content);
  const [mood, setMood] = useState(entry.mood);

  const handleChange = (e) => {
    setContent(e.target.value);
    updateEntry(entry.id, e.target.value, mood);
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
    updateEntry(entry.id, content, e.target.value);
  };

  return (
    <EntryContainer>
      <EntryHeader>
        <EntryDate>{format(entry.date, 'MMMM do, yyyy - h:mm a')}</EntryDate>
        <DeleteButton onClick={() => deleteEntry(entry.id)}>Delete</DeleteButton>
      </EntryHeader>
      <EntryTextArea
        value={content}
        onChange={handleChange}
        placeholder="Write your thoughts here..."
      />
      <MoodSelect value={mood} onChange={handleMoodChange}>
        <option value="">Select Mood</option>
        <option value="Happy">😊 Happy</option>
        <option value="Sad">😢 Sad</option>
        <option value="Energetic">🎉 Energetic</option>
        <option value="Calm">🧘 Calm</option>
        <option value="Angry">😡 Angry</option>
      </MoodSelect>
      {mood && (
        <CreatePlaylistButton onClick={() => createPlaylist(mood)}>
          Create {mood} Playlist on Spotify
        </CreatePlaylistButton>
      )}
    </EntryContainer>
  );
}

export default JournalEntry;