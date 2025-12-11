import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";

export const profileupdate = async (req, res) => {
  try {
    let { fullname, email, password, number } = req.body;

    const updateData = {
      fullname,
      email: email?.toLowerCase(),  
      number,
    };

    if (password && password.trim() !== "") {
      const hash = await bcrypt.hash(password, 10);
      updateData.password = hash;
    }

    
    if (req.file) {
      updateData.profilepic = { Image: req.file.buffer };
    }

    await userModel.findOneAndUpdate(
      { _id: req.user.userid },
      updateData,
      { new: true }
    );

    req.flash("success", "Profile Updated Successfully");
    res.redirect("/user/profile");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};