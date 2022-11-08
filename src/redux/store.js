import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import rpm from "redux-promise-middleware";
import storage from "redux-persist/lib/storage";
import reducers from "./reducer";

// redux persist config start
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// redux-logger middleware
const logger = createLogger();
const middlewares = applyMiddleware(rpm, logger);

export let store = createStore(persistedReducer, middlewares);
export let persistor = persistStore(store);
