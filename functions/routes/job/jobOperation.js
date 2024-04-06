require('dotenv').config();
const express = require('express');
const router = express.Router();
const Jobs = require('../../models/JobSchema');
const fetchadmin = require('../../middleware/fetchAdmin');

//GET ALL JOBS
router.get('/get-all-openings', async (req, res) => {
    try {
      const jobs = await Jobs.find({});
      res.json({ jobs: jobs });
    } catch (error) {
      console.log(error);
      res.json({ jobs: [] });
    }
  });
  
  //ADD OPENINGS
  router.post('/add-openings', async (req, res) => {
    const { designation, description, company, location, salary } = req.body;
    try {
      const newOpenings = await Jobs.create({ designation, description, company, location, salary });
      await newOpenings.save();
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });
  
  //EDIT TASK
//   router.put('/.netlify/functions/server/api/edit-task', async (req, res) => {
//     const { taskId, priority, status } = req.body;
//     try {
//       if(status === 'completed'){
//         await Task.updateOne({ _id: taskId }, { $set: { status: status, priority: priority, end_date: Date.now() } });
//       }else{
//         await Task.updateOne({ _id: taskId }, { $set: { status: status, priority: priority } });
//       }
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   });
  
  
  //DELETE TASK
//   router.delete('/.netlify/functions/server/api/delete-task/:taskId', async (req, res) => {
//     const taskId = req.params.taskId;
//     try {
//       await Task.deleteOne({ _id: taskId });
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   });
  


module.exports = router;