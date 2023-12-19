import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import LoginModel from "../model/login.js";
import ContectModel from "../model/contect.js";
import fetchUser from "../middleware/fetchuser.js";
const router = Router();

router.post("/", fetchUser, async (req, res) => {
  const id = req.user.id;
  try {
    if (!id) {
      return res.json({ success: false, msg: "You are not authorized" });
    }
    const { name, email, mobile, address, message } = req.body;

    await ContectModel.create({
      name,
      email,
      message,
      mobile,
      address,
    });
    return res.json({ success: true, msg: "query added into database" });
  } catch (error) {
    res.json({ status: false, error });
  }
});

router.get("/queries:email", fetchUser, async (req, res) => {
  const id = req.user.id;
  if (!id) {
    return res.json({ success: false, msg: "You are not authorized" });
  }
  try {
    const email = req.params.email;
    const queries = await ContectModel.findOne({ email: email });
    console.log(queries);
    res.json({ success: true, queries });
  } catch (error) {
    res.json({ status: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await LoginModel.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, msg: "First register youself" });
    } else {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return res.json({ success: false, msg: "password is wrong" });
      }
      const jwtToken = jsonwebtoken(user);
      return res.json({ success: true, jwtToken });
    }
  } catch (error) {
    res.json({ status: false, error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, address, password } = req.body;
    const user = await LoginModel.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.json({
        success: false,
        msg: "User already exist with this email id",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = LoginModel.create({
        name,
        email,
        mobile,
        address,
        password: hashPassword,
      });

      const jwtToken = jsonwebtoken(newUser);
      return res.json({ success: true, jwtToken });
    }
  } catch (error) {
    res.json({ status: false, error });
  }
});

const jsonwebtoken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("Please provide secret ");
    throw new Error("Internal Server Error");
  } else {
    const data = {
      user: {
        id: user.id,
      },
    };
    return jwt.sign(data, secret);
  }
};

export default router;
