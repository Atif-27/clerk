import connect from "../../mongodb/mongoose";
import User from "../../models/User";
import console from "console";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      {
        clerkId: id,
      },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses,
          username: username,
        },
      },
      {
        new: true,
        upsert: true,
      } // if user doesnt exist create one
    );
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log(error);
  }
};
