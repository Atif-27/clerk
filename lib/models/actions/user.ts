import connect from "../../mongodb/mongoose";
import User from "../../models/User";
import { EmailAddressJSON } from "@clerk/nextjs/server";

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: EmailAddressJSON[],
  // Adjust this type according to your actual data structure
  username: string
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
          email: email_addresses[0].email_addresses,
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

export const deleteUser = async (id: string) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log(error);
  }
};
