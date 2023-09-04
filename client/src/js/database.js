import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// This logic and method accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('Update the database');
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put({ id: 1, value: content });
    await tx.complete;
    console.log('data saved to the database');
  } catch (error) {
    console.error('Error adding data to the database:', error);
  }
};

// This logic and method gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET from the database');
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    console.log('result.value', result);
    return result?.value;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    return [];
  }
};


