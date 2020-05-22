
//./storage.js
const Storage = {
    getItem:async (key) => {
    let item = await AsyncStorage.getItem(key);
    //You'd want to error check for failed JSON parsing...
    return JSON.parse(item);
    },
    setItem:async (key , value) =>{
    return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem:async () =>  async function (key) {
    return await AsyncStorage.removeItem(key);
    }
    };
