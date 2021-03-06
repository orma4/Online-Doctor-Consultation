const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// Doctor model
const Doctor = require('../../models/Doctor');

// @route           GET api/doctors
// @description:    get all doctors
//@access           public

router.get('/'  , auth, (req,res) => {
       Doctor.find()
              .sort({ date: -1 })
              .then(doctors => res.json(doctors))
    });
    


// @route           GET api/doctors
// @description:    get single doctor
//@access           public
router.get('/:id', auth,(req,res) => {
    Doctor.findById(req.params.id)
        .then(doctor => res.json(doctor));
 });


 // @route           POST api/addFeedBack
// @description:    add   doctor feedback
//@access           public
router.post('/addFeedBack/:id', auth,async(req,res) => {
    var feedbacks=[];
    console.log(req.params.id)
   var doctor=await Doctor.findById(req.params.id);



console.log("doctor:",doctor)
   feedbacks=  doctor.feedbacks
            
   feedbacks.push({feedback:req.body.feedback,
            patientName:req.body.name})
            console.log(feedbacks)
            Doctor.findOneAndUpdate({_id : req.params.id}, {feedbacks:feedbacks   },
                { new: true }).then(res.json(feedbacks))
   
 });


// @route           POST api/doctors
// @description:    create a doctor
// @access           private
router.post('/', auth, (req,res) => {
   const newDoctor = new Doctor({
      _id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      fee: req.body.fee,
      exp: req.body.exp,
      phone: req.body.phone,
      address: req.body.address
   });

   newDoctor.save().then(doctor => res.json(doctor));
});

// @route           POST api/doctors/updateDoctorDetails
// @description:    create a doctor
// @access           private
router.post('/updateDoctorDetails', auth, (req,res) => {

    const newDoctor = new Doctor({
       _id: req.body._id,
       name: req.body.name,
       image: req.body.image,
       category: req.body.category,
       description: req.body.description,
       fee: req.body.fee,
       exp: req.body.exp,
       phone: req.body.phone,
       address: req.body.address,
       education:req.body.education,
       specialization:req.body.specialization,
       servicesOffered:req.body.servicesOffered,
    });
    console.log(newDoctor)
    // Doctor.findById(req.body._id).then((res)=>console.log(res,"data:"))

    Doctor.findOneAndUpdate({_id : req.body._id}, {...newDoctor},
        { new: true }).then(res.json(newDoctor))
 
    
 });

// @route           POST api/doctors
// @description:    add taken  appointment
// @access           private

// takenAppointments:
router.post('/addTakenAppointment', auth, async (req,res) => {
    // console.log(req.body)
    var takenAppointments=[];
    
   var doctor=await Doctor.findById(req.body.doctor._id);
        
            takenAppointments=  doctor.takenAppointments;
            
            takenAppointments.push({date:req.body.date,
            time:req.body.time})
            console.log(takenAppointments)
            Doctor.findOneAndUpdate({_id : req.body.doctor._id}, {takenAppointments:takenAppointments   },
                { new: true }).then(res.json(takenAppointments))
       

        
    
           
 
 });
// @route           DELETE api/doctor/:id
// @description:    delete a doctor
// @access           private
router.delete('/:id', auth, (req,res) => {
    Doctor.findById(req.params.id)
        .then(doctor => doctor.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
 });
 
module.exports = router;