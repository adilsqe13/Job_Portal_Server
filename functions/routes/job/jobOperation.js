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
  
  //EDIT JOB DETAILS
  router.put('/edit-job-details', fetchadmin, async (req, res) => {
    const { jobId, designation, company, description, salary, location } = req.body;
    try {
        await Jobs.updateOne({ _id: jobId }, { $set: { designation, description, company, salary, location }});
        res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });
  
  
  //DELETE JOB
  router.delete('/delete-job/:jobId', fetchadmin, async (req, res) => {
    const jobId = req.params.jobId;
    try {
      await Jobs.deleteOne({ _id: jobId });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });
  


module.exports = router;