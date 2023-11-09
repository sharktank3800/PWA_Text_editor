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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Input to the db")

  // Connection to db and version designated to use
  const jateDb = await openDB("jate", 1);

  // New transcation and defining the db and db entitlement
  const transAct = jateDb.transaction("jate", "readwrite");

  // Accessing the Obj store within the transaction
  const store = transAct.objectStore("jate");

  // validating if the data with id 1 already exists
  const existingData = await store.get(1);

  if(existingData){
    // if exist then Update it using put
    return await store.put({id: 1, value: content});
  }

  // doesnt exist then add it using add
  const addResult = await store.add({id: 1, value: content})

  // complete transaction
  await transAct.done;

  return addResult;

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get from DB")

    // Connection to db and version designated to use
    const jateDb =await openDB("jate", 1);

    // New transaction and defining the db and db entitlement
    const transAct = jateDb.transaction("jate", "readonly");

    // Accessing the Obj store within the transaction
    const store = transAct.objectStore("jate");

    // Get all content from the Obj store
    const allContent = await store.getAll();

    // complete transaction
    await transAct.done;

    return allContent;
}
initdb();
