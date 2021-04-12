import firebase from "./firebase.util";
import dateFns from "./dateFns.util";
import fbs from "firebase";
import log from "./log.util";

const utils = {
  firebase,
  dateFns,
  log,
  firebaseUtil: fbs,
};

export default utils;
