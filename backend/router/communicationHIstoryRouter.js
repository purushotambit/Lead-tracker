const express = require('express');
const router = express.Router();
// const Lead = require("../models/leadData");
const { validationResult } = require('express-validator');
const authenticate = require('../middlewares/authenticate');

// const Comm = require('../models/communicationHistorySechema');
const Comm =require('../models/communicationHistorySechema')
// const comm =require('../models/')
// const Lead = require('../models/leadData');
const Lead=require('../models/LeadSchema');

router.post('/register', authenticate, async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors : errors.array()});
    }
    try {
        let {leadId,date,type,content}=request.body;
        console.log("Purushtoam ")
        console.log(date);
        let lead=await Lead.findById(leadId);
        if(!lead){
            return  response.status(404).json({msg : "Lead is not found"});
        }

        let newPost = {
            leadId:lead._id,
            date:date,
            type:type,
            content:content
        };
        let post = new Comm(newPost);
        // post = await Lead.populate(post);
        post = await post.save();
        return response.status(200).json({msg : "Communication added Successfully"});
        
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

router.get('/:leadId', authenticate, async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors : errors.array()});
    }
    try {
        let leadId=request.params.leadId;
      
        const communications = await Comm.find({ leadId }).populate('leadId');
        console.log(communications)
    if (!communications) {
      return response.status(404).json({ message: 'No Communications found for the given Lead ID' });
    }

    return response.status(200).json({comms: communications });
        
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});



// router.get('/:commId', authenticate, async (request , response) => {
//     let errors = validationResult(request);
//     if(!errors.isEmpty()){
//         return response.status(400).json({errors : errors.array()});
//     }
//     try {
//         let commId=request.params.commId;
//         let comm=await Comm.findById(commId);

//         if(!comm){
            
//             return response.status(404).json({ message: 'Communication Not Found' });
//         }
        
//         response.status(200).json({comm : comm});
        
//     }
//     catch (error) {
//         console.error(error);
//         response.status(500).json({errors : [{msg : error.message}]});
//     }
// });


// router.put('/:commId', authenticate, async (request , response) => {
//     let errors = validationResult(request);
//     if(!errors.isEmpty()){
//         return response.status(400).json({errors : errors.array()});
//     }
//     try {
//         let commId=request.params.commId;

//         let comm = await Lead.findOne({_id :commId});

//         if(!comm){
//             return response.status(404).json({errors : [{msg : 'No Communicaiton History Found'}]});
//         }

//         let [leadId,date,type,content]=request.body;
//         let commObj = {
//             firstname: firstname ?? "",
//             leadId:leadId ??"",
//             date:date ??"",
//             type:type ??"",
//             content:content ??"",
//         };
          

//         // update to db
//         comm = await Comm.findOneAndUpdate({_id :commId} , {
//             $set : commObj
//         } , {new : true})

//         response.status(200).json({ msg :'Updated Successfully'})
     
        
//     }
//     catch (error) {
//         console.error(error);
//         response.status(500).json({errors : [{msg : error.message}]});
//     }
// });


router.delete('/:commId', authenticate , async (request , response) => {
    try {
        let commId = request.params.commId;
        
        let comm = await Comm.findById(commId);
       
        if(!comm){
            return response.status(404).json({errors : [{msg : 'No Communication History Found'}]});
        }
       

        // let removableIndex = lead.map(lead => lead._id).indexOf(leadId);
        console.log("Purushotam Kumar")
        console.log(comm)
        const deletedDocument = await Comm.findOneAndDelete({ _id:commId });

        if (deletedDocument) {
          return response.status(200).json({ msg: 'Communication Deleted Successefully' });
        }

        return response.status(404).json({errors : [{msg :'No Communication History Found'}]});
       
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});



module.exports = router;






