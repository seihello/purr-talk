import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function resetWordProgress() {
  // await AsyncStorage.clear();
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys);
}
