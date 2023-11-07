// src/persistor.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

/* The code is creating an instance of an async storage persister using the
`createAsyncStoragePersister` function from the `@tanstack/query-async-storage-persister` library. */
export const asyncStoragePersistor = createAsyncStoragePersister({
  storage: AsyncStorage,
});
