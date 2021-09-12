import AsyncStorage from '@react-native-async-storage/async-storage';

class Stograge {
    constructor() {
    }
    async storeData(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
        }
    }
    async getData(key: string) {
        try {
            return AsyncStorage.getItem(key)
        } catch (e) {
            // error reading value
        }
    }
    async removeData(key: string) {
        try {
            return AsyncStorage.removeItem(key)
        } catch (e) {
            // error reading value
        }
    }
}

export default new Stograge()
