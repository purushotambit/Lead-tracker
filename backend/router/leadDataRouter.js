const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Lead = require("../models/LeadSchema");
const authenticate = require("../middlewares/authenticate");

router.post(
  "/register",
  [
    body("firstname").notEmpty().withMessage("Name is Required"),
    body("lastname").notEmpty().withMessage("Name is Required"),
    body("email").notEmpty().withMessage("Email is Required"),
  ],
  authenticate,
  async (request, response) => {
    console.log(request.body);
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      let {
        firstname,
        lastname,
        email,
        phone,
        source,
        description,
        dueDate,
        status,
        index,
      } = request.body;

  

      // console.log(request.body);

      let  lead = await Lead.findOne({email : email});

      if(lead){
          return response.status(201).json({errors : [{msg : 'Lead Already Exists'}]});
      }

      if (dueDate) {
        const [month, day, year] = dueDate.split("-").map(Number);
        dueDate = new Date(year, month - 1, day);
      }

      if (!status) status = "Pending";

      if (!index) index = 0;
      // insert the lead into database
       lead = new Lead({
        firstname,
        lastname,
        email,
        phone,
        source,
        description,
        dueDate,
        status,
        index,
      });
      await lead.save();
      response.status(200).json({ msg: "Lead added Successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

router.get("/allLeads", authenticate, async (request, response) => {
  try {
    console.log("Purushotam Kumar");

    let allLeads = await Lead.find({});
    if (!allLeads) {
      return response.status(400).json({ errors: [{ msg: "No Leads Found" }] });
    }

    response.status(200).json({ allLeads: allLeads });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

router.put(
  "/:leadId",
  [
    body("firstname").notEmpty().withMessage("Firstname is Required"),
    body("lastname").notEmpty().withMessage("lastname is Required"),
    body("email").notEmpty().withMessage("Email is Required"),
  ],
  authenticate,
  async (request, response) => {
    let leadId = request.params.leadId;

    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      let {
        firstname,
        lastname,
        email,
        phone,
        source,
        description,
        dueDate,
        status,
        index,
      } = request.body;

      if (dueDate) {
        const [month, day, year] = dueDate.split("-").map(Number);
        dueDate = new Date(year, month - 1, day);
      }
      let lead = await Lead.findOne({ _id: leadId });

      if (!lead) {
        return response
          .status(404)
          .json({ errors: [{ msg: "No Lead Found" }] });
      }

      if (!status) status = "Pending";

      if (!index) index = 0;

      let leadObj = {
        firstname: firstname ?? "",
        lastname: lastname ?? "",
        email: email ?? "",
        phone: phone ?? "",
        source: source ?? "",
        description: description ?? "",
        dueDate: dueDate ?? "",
        status: status ?? "",
        index: index ?? "",
      };

      // update to db
      lead = await Lead.findOneAndUpdate(
        { _id: leadId },
        {
          $set: leadObj,
        },
        { new: true }
      );

      response.status(200).json({ msg: "Updated Successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

router.get("/:leadId", authenticate, async (request, response) => {
  try {
    let leadId = request.params.leadId;
    let lead = await Lead.findById(leadId);
    // console.log(lead);

    if (!lead) {
      return response.status(404).json({ message: "Lead Not Found" });
    }
    response.status(200).json({
      lead: lead,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});
router.delete("/:leadId", authenticate, async (request, response) => {
  try {
    let leadId = request.params.leadId;
    // console.log(leadId);
    console.log("Purushotam Kumar");
    let lead = await Lead.findById(leadId);
    console.log(lead);
    if (!lead) {
      return response.status(404).json({ errors: [{ msg: "No Lead Found" }] });
    }

    // let removableIndex = lead.map(lead => lead._id).indexOf(leadId);
    const deletedDocument = await Lead.findOneAndDelete({ _id: leadId });

    if (deletedDocument) {
      return response.status(200).json({ msg: "Lead Deleted Successefully" });
    }

    return response.status(404).json({ errors: [{ msg: "No Lead Found" }] });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

module.exports = router;
