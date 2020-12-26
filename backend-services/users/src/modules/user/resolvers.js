const User = require("../../models/user");

module.exports = {
  Query: {
    me: async (root, args, context) => {
      const { userId } = context;

      if (!userId) throw new Error("Not allowed!");

      return await User.findOne({ _id: userId });
    },
  },
  User: {
    async __resolveReference(object) {
      return await User.findOne({ _id: object.id });
    },
  },
  UserAddress: {
    async __resolveReference(object) {
      let user = await User.findOne({ "addresses._id": object.id });

      if (user)
        return user.addresses.find((_a) => _a._id.toString() == object.id);

      return null;
    },
  },
};
