const parser = (data) => JSON.parse(data);
const stringify = (data) => JSON.stringify(data);
const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const existCollectionName = (collectionName) => {
    const collectionNameExist = localStorage.getItem(collectionName);
    if (!collectionNameExist) localStorage.setItem(collectionName, stringify([]));
    return true;
};

const localDB = (collectionName) => {
    const checkIdExist = (id) => {
        const currentCollectionData = get();
        return currentCollectionData.find((data) => data.id === id);
    };

    const get = () => {
        existCollectionName(collectionName);
        return parser(localStorage.getItem(collectionName));
    };

    const insert = (data) => {
        data.id = uuid();
        const newCollectionData = [...get(), data];
        localStorage.setItem(collectionName, stringify(newCollectionData));
        return data;
    };

    const update = (id, data) => {
        if (!checkIdExist(id)) return false;

        const currentCollectionData = get();
        const newCollectionData = currentCollectionData.map((_data) => {
            if (_data.id === id) {
                _data = {
                    ..._data,
                    ...data
                };
            };
            return _data;
        });
        localStorage.setItem(collectionName, stringify(newCollectionData));
    };

    const remove = (id) => {
        if (!checkIdExist(id)) return false;
        const currentCollectionData = get();
        const newCollectionData = currentCollectionData.filter((data) => data.id !== id);
        localStorage.setItem(collectionName, stringify(newCollectionData));
    };

    return {
        get,
        insert,
        update,
        remove
    };
};

export default localDB;