import { markPlayer, fetchAllServerInfo, fetchPlayerInfos, fetchPlayerHistory } from "./players";
import { setSetting, getAllSettings } from "./preferences";

export const emptyServerData: ServerInfoResponse = {
  hostname: "",
  ip: "",
  map: "",
  maxPlayers: 32,
  numPlayers: 0,
  players: []
}

export {
  markPlayer,
  fetchAllServerInfo,
  fetchPlayerInfos,
  fetchPlayerHistory,
  setSetting,
  getAllSettings
}