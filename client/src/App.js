import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const response = await axios.get('http://localhost:5000/api/links');
    setLinks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/links', newLink);
    setNewLink({ title: '', url: '' });
    fetchLinks();
  };

  return (
    <div className="App">
      <h1>Link List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <button type="submit">Add Link</button>
      </form>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;