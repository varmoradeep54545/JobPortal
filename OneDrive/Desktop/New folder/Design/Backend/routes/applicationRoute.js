const express = require('express');
const router = express.Router();
const Applicant = require('../models/Applicant');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/form', upload.single('uploadCV'), async (req, res) => {
    try {
        const { name, email, contactnumber, noticeperiod, joblocation, currentorganization, currentCTC, expectedCTC, experienceYearsandMonths } = req.body;
        const fileName = req.file ? req.file.originalname : "No file uploaded";
        const newApplicant = new Applicant({
            name, email, contactnumber, noticeperiod, joblocation, currentorganization, currentCTC, expectedCTC, experienceYearsandMonths, uploadCV: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename: fileName
            }
        });

        const response = await newApplicant.save();

        res.json({ response, message: 'Form Submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Form submission failed' });
    }
});

router.get("/form/:id/download", async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant || !applicant.uploadCV || !applicant.uploadCV.data) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.setHeader('Content-Type', applicant.uploadCV.contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${applicant.uploadCV.filename}`);
        res.send(applicant.uploadCV.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/form", async (req, res) => {
    const { id } = req.params;
    const allApplicant = await Applicant.find();

    try {
        res.status(200).json(allApplicant);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;