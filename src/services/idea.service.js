import services from ".";
import utils from "../utils";

const idea = {
  create: async function (idea) {
    const ideaRef = utils.firebase.firestore().collection("ideas").doc();
    const thread = await services.thread.create({ count: 1 });
    const timestamp = utils.dateFns.getUnixTime(new Date());

    const ideaWithID = {
      ...idea,
      id: ideaRef.id,
      threadID: [thread.id],
      repliedID: null,
      userID: 1,
      isFirstReply: true,
      repliesCount: 0,
      isStarred: false,
      createdTime: timestamp,
      updatedTime: timestamp,
    };

    ideaRef.set(ideaWithID);

    return ideaWithID;
  },

  fetch: async function ({ end, limit }) {
    return utils.firebase
      .firestore()
      .collection("ideas")
      .orderBy("createdTime", "desc")
      .startAt(end)
      .limit(limit)
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
    utils.firebase
      .firestore()
      .collection("ideas")
      .doc(idea.id)
      .update(update) // prettier-ignore

    return { ...idea, update };
  },

  createResponse: async function (idea, repliedIdea) {
    const ideaRef = utils.firebase.firestore().collection("ideas").doc();
    const repliedIdeaRef = utils.firebase.firestore().collection("ideas").doc(repliedIdea.id); // prettier-ignore
    const thread = await services.thread.create({ count: 1 });
    const timestamp = utils.dateFns.getUnixTime(new Date());
    const isFirstReply = repliedIdea.repliesCount === 0;

    const ideaWithID = {
      ...idea,
      id: ideaRef.id,
      threadID: isFirstReply ? [...repliedIdea.threadID] : [thread.id],
      repliedID: repliedIdea.id,
      userID: 1,
      isFirstReply,
      repliesCount: 0,
      isStarred: false,
      createdTime: timestamp,
      updatedTime: timestamp,
    };

    const repliedIdeaUpdate = {
      repliesCount: repliedIdea.repliesCount + 1,
      threadID: isFirstReply
        ? [...repliedIdea.threadID]
        : [...repliedIdea.threadID, thread.id],
      updatedTime: timestamp,
    };

    repliedIdeaRef.update(repliedIdeaUpdate);

    const affectedThreadIDrefs = isFirstReply
      ? [...repliedIdea.threadID]
      : [...repliedIdea.threadID, thread.id];

    affectedThreadIDrefs.forEach((threadID) =>
      utils.firebase
        .firestore()
        .collection("threads")
        .doc(threadID)
        .update({ count: utils.firebaseUtil.firestore.FieldValue.increment(1) })
    );

    ideaRef.set(ideaWithID);

    return [ideaWithID, { ...repliedIdea, ...repliedIdeaUpdate }];
  },
};

function mapToIdeas(snap) {
  return mapToDocument(snap);
}

function mapToDocument(snap) {
  return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export default idea;
