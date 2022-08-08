// import campaignModel from "../model/campaign.model.js";
// //getting all campaigns from monogoDB

// export const getAllCampaigns = async (req, res) => {
//   try {
//     const campaigns = await campaignModel.find();
//     res.status(200).json(campaigns);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// //get a campaign by ID
// export const getcampaignById = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const newcampaign = await campaignModel.findById(id);
//     res.status(200).json(newcampaign);
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };

// //add a campaign to record
// export const addcampaign = async (req, res) => {
//   const { userId, catogary, title, author, discription, goal, image, days } =
//     req.body;
//   try {
//     const newcampaign = new campaignModel({
//       userId,
//       catogary,
//       title,
//       author,
//       discription,
//       goal,
//       image,
//       days,
//     });
//     await newcampaign.save();
//     res.status(201).json(newcampaign);
//   } catch (error) {
//     res.status(401).send(error);
//   }
// };

// //update a campaign by id
// export const updateCampaign = async (req, res) => {
//   const id = req.params.id;
//   const { userId, catogary, title, author, discription, goal, image, endDate } =
//     req.body;
//   try {
//     if (id) {
//       await campaignModel.findByIdAndUpdate(id, {
//         userId,
//         catogary,
//         title,
//         author,
//         discription,
//         goal,
//         image,
//         endDate,
//       });
//       res.status(200).json({
//         id: req.params.id,
//         userId,
//         catogary,
//         title,
//         author,
//         discription,
//         goal,
//         image,
//         endDate,
//       });
//     } else {
//       res.status(500).send("campaign not found agains this id");
//     }
//   } catch (error) {
//     res.status(404).send(error);
//   }
// };

// export const deleteCampaignById = async (req, res) => {
//   const id = req.params.id;
//   try {
//     await campaignModel.findByIdAndRemove(id);
//     res.status(201).send("campaign deleted successfully..");
//   } catch (error) {
//     res.status(404).send(error);
//   }
// };

// export const deleteAllcampaigns = async (req, res) => {
//   try {
//     await campaignModel.remove();
//     res.status(200).send("All campaigns deleted successfully..");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };
