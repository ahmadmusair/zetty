import utils from "../utils";

const thread = {
  create: function (thread) {
    const threadRef = utils.firebase.firestore().collection("threads").doc();
    const threadWithID = { ...thread, id: threadRef.id };

    threadRef.set(threadWithID);

    return threadWithID;
  },
};

export default thread;
