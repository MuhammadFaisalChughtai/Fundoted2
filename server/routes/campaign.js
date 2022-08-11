const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const fs = require("fs");
const Campaign = require("../model/Campaign");
const User = require("../model/User");
const Image = require("../model/Image");
const path = require("path");
const jwt = require("jsonwebtoken");

const checkObjectId = require("../middleware/checkObjectId");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const checkObjectId = require("../../middlew`a`re/checkObjectId");
router.post(
  "/create-campaign",
  [upload.single("image"), auth],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newCampaign = new Campaign({
        name: user.name,
        user: req.user.id,
        catogary: req.body.catogary,
        title: req.body.title,
        author: req.body.author,
        discription: req.body.discription,
        image: req.body.image,
        goal: req.body.goal,
        days: req.body.days,
        pledged: req.body.pledged,
        noOfBackers: req.body.noOfBackers,
        expectedDonation: req.body.expectedDonation,
        maximumDonation: req.body.maximumDonation,
        city: req.body.city,
        country: req.body.country,
        expDate: req.body.expDate,
      });

      const campaignSave = await newCampaign.save();
      res.json(campaignSave);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
router.post("/upload-photo", upload.single("img"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("Hellow");
  console.log(req.file);
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString("base64");
  var final_img = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_img, "base64"),
  };
  Image.create(final_img, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.contentType(final_img.contentType);
      res.end(url + "/uploads/" + req.file.filename);
    }
  });
});
router.post("/all-compaign", async (req, res) => {
  try {
    const compaign = await Campaign.find()
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);
    // .limit(req.body.limit)
    // .skip(req.body.skip);

    res.json({ compaign });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.post("/view-compaign", async (req, res) => {
  try {
    const title = req.body.title;
    const compaign = await Campaign.findOne({ title }).populate("user", [
      "fname",
      "email",
    ]);
    res.json({ compaign });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.delete(
  "/delete-compaign/:id",
  [auth, checkObjectId("id")],
  async (req, res) => {
    try {
      const compaign = await Campaign.findById(req.params.id);

      if (!compaign) {
        return res.status(404).json({ msg: "compaign not found" });
      }

      if (compaign.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      await compaign.remove();

      res.json({ msg: "property removed" });
    } catch (err) {
      console.error(err);

      res.status(500).send("Server Error");
    }
  }
);
router.put("/update-post", [upload.single("image"), auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    if (!user) {
      res.status(404).json("user not found");
    }
    const updateCompaign = {
      name: user.name,
      user: req.user.id,
      catogary: req.body.catogary,
      title: req.body.title,
      author: req.body.author,
      discription: req.body.discription,
      image: req.body.image,
      goal: req.body.goal,
      days: req.body.days,
      pledged: req.body.pledged,
      noOfBackers: req.body.noOfBackers,
      expectedDonation: req.body.expectedDonation,
      maximumDonation: req.body.maximumDonation,
      city: req.body.city,
      country: req.body.country,
      expDate: req.body.expDate,
    };
    const id = req.body.id;
    console.log(req.body.id);
    let compaign = await Campaign.findByIdAndUpdate(id, updateCompaign, {
      new: true,
    });
    res.json({ compaign });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/my-campaign", auth, async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.user.id);
    const campaign = await Campaign.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);

    res.json({ campaign });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.post("/switch", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    console.log(id);
    const user = await User.findById(id);
    if (user.title === "user") {
      user.title = "invester";
    } else {
      user.title = "user";
    }
    const updatedUser = {
      id: user.id,
      fname: user.fname,
      email: user.email,
      password: user.password,
      title: user.title,
      role: user.role,
      password: user.password,
    };
    console.log(updatedUser);
    let newuser = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    console.log(newuser);
    const payload = {
      user: {
        id: user.id,
      },
    };
    const data = {
      id: user.id,
      email: user.email,
      title: user.title,
      role: user.role,
      name: user.fname,
    };
    // res.json({ newuser });
    jwt.sign(
      payload,
      process.env.secretOrKey,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, data });
      }
    );
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.delete("/delete-campaign-admin/:id", async (req, res) => {
  try {
    const camp = await Campaign.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({ msg: "campaign not found" });
    }
    await camp.remove();

    res.json({ msg: "campaign removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.put("/update-camp-admin", upload.single("image"), async (req, res) => {
  try {
    updateCampaign = {
      catogary: req.body.catogary,
      title: req.body.title,
      author: req.body.author,
      discription: req.body.discription,
      image: req.body.image,
      goal: req.body.goal,
      days: req.body.days,
      pledged: req.body.pledged,
      noOfBackers: req.body.noOfBackers,
      expectedDonation: req.body.expectedDonation,
      maximumDonation: req.body.maximumDonation,
      city: req.body.city,
      country: req.body.country,
      expDate: req.body.expDate,
    };
    const id = req.body._id;
    console.log(id);
    let campaign = await Campaign.findByIdAndUpdate(id, updateCampaign, {
      new: true,
    });
    res.json({ campaign });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post("/range-campaign", async (req, res) => {
  try {
    const { type, price } = req.body;
    catogary = req.body.type;
    console.log(catogary);
    const price1 = price.split(",")[0];
    const price2 = price.split(",")[1];
    let campaign = await Campaign.find({ catogary })
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);

    console.log(campaign);
    res.json({ campaign });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});

router.post("/fund-now", async (req, res) => {
  try {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd",
    };
    const { pid } = req.body;
    console.log(body);
    const result = stripe.charges.create(body);
    const camp = await Campaign.findById(pid);
    if (result) {
      const UpdateProperty = {
        catogary: camp.catogary,
        title: camp.title,
        author: camp.author,
        discription: camp.discription,
        image: camp.image,
        goal: camp.goal,
        days: camp.days,
        pledged: camp.pledged + req.body.amount,
        noOfBackers: camp.noOfBackers + 1,
        expectedDonation: camp.expectedDonation,
        maximumDonation: camp.maximumDonation,
        city: camp.city,
        country: camp.country,
        expDate: camp.expDate,
        funding: camp.funding + req.body.amount,
      };
      await Campaign.findByIdAndUpdate(pid, UpdateProperty, {
        new: true,
      });
    }
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

module.exports = router;
