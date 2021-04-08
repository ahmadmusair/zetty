import services from ".";
import utils from "../utils";

const idea = {
  create: async function (ideaDraft) {
    const ideaRef = utils.firebase.firestore().collection("ideas").doc();
    const timestamp = utils.dateFns.getUnixTime(new Date());

    const idea = {
      id: ideaRef.id,
      title: ideaDraft.title,
      decription: ideaDraft.description,
      repliedID: null,
      repliesCount: 0,
      userID: 1,
      isStarred: false,
      createdTime: timestamp,
      updatedTime: timestamp,
    };

    ideaRef.set(idea);

    return idea;
  },

  fetch: async function ({ end, limit }) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .orderBy("createdTime", "desc")
      .startAfter(end)
      .limit(limit)
      .get()
      .then(mapToIdeas);
  },

  rawFetch: async function ({ end, limit }) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .orderBy("createdTime", "desc")
      .startAfter(end)
      .limit(limit)
      .get();
  },

  fetchByRepliedID: async function (id) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .where("repliedID", "==", id)
      .get()
      .then((snap) => snap.docs.map((idea) => ({ ...idea.data(), id: idea.id }))) // prettier-ignore
  },

  fetchByID: async function (id) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .doc(id)
      .get()
      .then((snap) => {
        if (snap.exists) {
          return { ...snap.data(), id: snap.id };
        } else {
          throw Error(`Idea with id: ${id}, doesn't exist!`);
        }
      });
  },

  getSnapshot: function (id) {
    return utils.firebase.firestore().collection("ideas").doc(id);
  },

  fetchByThreadIDs: async function (threadIDs) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .orderBy("createdTime", "desc")
      .startAt(utils.dateFns.getUnixTime(new Date()))
      .where("threadID", "array-contains-any", threadIDs)
      .get()
      .then(mapToIdeas);
  },

  star: function (idea) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .doc(idea.id)
      .update({ isStarred: true });
  },

  unstar: function (idea) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .doc(idea.id)
      .update({ isStarred: false });
  },

  update: function (idea, update) {
    return new Promise((resolve, reject) => {
      utils.firebase
        .firestore()
        .collection("ideas")
        .doc(idea.id)
        .update(update)
        .then(() => resolve({ ...idea, update }))
        .catch(reject);
    });
  },

  createResponse: async function (ideaDraft, repliedIdea) {
    const timestamp = utils.dateFns.getUnixTime(new Date());
    const ideaRef = utils.firebase.firestore().collection("ideas").doc();
    const repliedIdeaRef = utils.firebase.firestore().collection("ideas").doc(repliedIdea.id); // prettier-ignore
    const repliedIdeaUpdate = { repliesCount: repliedIdea.repliesCount + 1 };
    const updatedRepliedIdea = { ...repliedIdea, ...repliedIdeaUpdate };

    const idea = {
      id: ideaRef.id,
      title: ideaDraft.title,
      decription: ideaDraft.description,
      repliedID: repliedIdea.id,
      userID: 1,
      repliesCount: 0,
      isStarred: false,
      createdTime: timestamp,
      updatedTime: timestamp,
    };

    ideaRef.set(idea);
    repliedIdeaRef.update(repliedIdeaUpdate);
    console.log({ idea, updatedRepliedIdea });

    return [idea, updatedRepliedIdea];
  },
};

function mapToIdeas(snap) {
  return mapToDocument(snap);
}

function mapToDocument(snap) {
  return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export default idea;
