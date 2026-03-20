'use client';

import { useState } from 'react';
import { tables, reducers } from '../src/module_bindings';
import { useSpacetimeDB, useTable, useReducer } from 'spacetimedb/react';

export function PersonList() {
  const [name, setName] = useState('');

  const conn = useSpacetimeDB();
  const { isActive: connected } = conn;

  // Subscribe to all people in the database
  // useTable returns [rows, isLoading] tuple
  const [people, isLoading] = useTable(tables.person);

  const addReducer = useReducer(reducers.add);

  const addPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !connected) return;

    // Call the add reducer with object syntax
    addReducer({ name: name });
    setName('');
  };

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        Status:{' '}
        <strong style={{ color: connected ? 'green' : 'red' }}>
          {connected ? 'Connected' : 'Connecting...'}
        </strong>
      </div>

      <form onSubmit={addPerson} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
          disabled={!connected}
        />
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem' }}
          disabled={!connected}
        >
          Add Person
        </button>
      </form>

      <div>
        <h2>People ({isLoading ? '...' : people.length})</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : people.length === 0 ? (
          <p>No people yet. Add someone above!</p>
        ) : (
          <ul>
            {people.map((person, index) => (
              <li key={index}>{person.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
