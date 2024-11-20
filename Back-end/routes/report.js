const express=require('express');

const {handleLoginDetails,handleUploading}=require('../controllers/report');


const router=express.Router();

router.post('/login',handleLoginDetails);
router.post('/photos',handleUploading);

module.exports=router;