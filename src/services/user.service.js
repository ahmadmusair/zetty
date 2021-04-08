import utils from "../utils";

const user = {
  signup: function ({ email, password }) {
    return utils.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  },
};

export default user;
