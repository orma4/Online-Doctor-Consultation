import React, { useState, useEffect} from 'react';
import '../DoctorComponent/Dashboard/AppointmentModal.css'
import { useForm } from 'react-hook-form';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import { deleteAppointment, getPatientAppointments, updateAppointment,getDoctorAppointments} from '../../actions/appointmentActions';
import { connect } from 'react-redux';
import { getSingleDoctor } from '../../actions/patientActions';

import {
  // Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateDoctorDetails } from '../../actions/doctorActions';

import { clearErrors } from '../../actions/errorActions';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import '../DoctorComponent/Dashboard/style.css'
import FileUpload from '../GeneralComponents/FilesComponents/FileUpload';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EditDoctorDetail = (props) => {
  const classes = useStyles();
  const { errors, register } = useForm();
 // const [appointment, setAppointment] = useState({...props.appointment});
  const [modal, setModal] = useState(false);

//   var doctor = {...props.user};
//   const {id} = props.user;
//   const {userType} = props.user;
 
 let  [doctor,setDoctor]=useState({...props.doctor})
 console.log(props.doctor,props.singleDoctor)
const onChange = (e) => {
setDoctor({...doctor, [e.target.name]: e.target.value});
}
  const onSubmit = (data, e) => {
    // setAppointment({ ...appointment })
    console.log(doctor);
     props.updateDoctorDetails(doctor);
    //  props.getSingleDoctor(doctor.id);
     //if(userType==="doctor")
       // props.getDoctorAppointments(id);
    //   if(userType==="patient")
    //     props.getPatientAppointments(id)
     toggle();
     
  
  };
  


  const toggle = () => {
    //Clear Errors
    props.clearErrors();
    console.log(modal);
    setModal(!modal);
};

// const statusHandler = async (e) => {
//   e.persist();
//   appointment = {
//       ...appointment,
//       [e.target.name]: e.target.value
//   }
//   await props.updateAppointment({...appointment,[e.target.name]: e.target.value});
//   alert(`Appointment ${e.target.value}`);
// }

// const handleClickDelete = () => {
//   console.log(appointment._id);
//   props.deleteAppointment(appointment._id);
// }

// const submit = () => {
//   confirmAlert({
//     customUI: ({ onClose }) => {
//       return (
//         <div className='custom-ui'>
//           <h1>Are you sure?</h1>
//           <p>You want to delete this file?</p>
//           <button onClick={onClose}>No</button>
//           <button
//             onClick={() => {
//               handleClickDelete();
//               onClose();
//             }}
//           >
//             Yes, Delete it!
//           </button>
//         </div>
//       );
//     }
//   });
// };


return (
            doctor && <div>
                  {
                    // (userType==="doctor") &&
                       <button data-toggle="modal" onClick={toggle} className="btn btn-warning text-light"> 
                    <span className="fa fa-pencil btn btn-warning text-light"/> 
                    </button> 
                    }
                    <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Update Appointment
                    </ModalHeader>
                        <ModalBody>
                        <Form onSubmit={onSubmit}>
                              <FormGroup >
                            
                         <FileUpload/>

                              
                                {/* <Label for='email'>
                                      Email
                                  </Label>
                                  <Input
                                  type='email'
                                  name='email'
                                  id="email"
                                  
                                  className="mb-3"
                                  onChange={onChange}
                                  defaultValue={UserState.email}/> */}
                               
                                <Label for='name'>
                                      name
                                  </Label>
                                  <Input
                                  type='name'
                                  name='name'
                                  id="name"
                                  className="mb-3"
                                  onChange={onChange}
                                  defaultValue={doctor.name}/>
                                <Label for='description'>
                                description
                                  </Label>
                                  <Input
                                  type='name'
                                  name='description'
                                  id="description"
                                  className="mb-3"
                                  onChange={onChange}
                                  defaultValue={doctor.description}/>

<div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={doctor.description}
            onChange={onChange}
            placeholder="Enter doctor's description"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="fee">Doctor Fee</label>
          <input
            type="number"
            name="fee"
            id="fee"
            value={doctor.fee}
            onChange={onChange}
            placeholder="Enter doctor's fee"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="exp">Doctor Experience</label>
          <input
            type="number"
            name="exp"
            id="exp"
            value={doctor.exp}
            onChange={onChange}
            placeholder="Enter doctor's experience"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Doctor Phone no.</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={doctor.phone}
            onChange={onChange}
            placeholder="Enter doctor's phone"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="education">Education</label>
          <input
            type="text"
            name="education"
            id="education"
            value={doctor.education}
            onChange={onChange }
            placeholder="Enter doctor's Education"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={doctor.description}
            onChange={onChange}
            placeholder="Enter doctor's description"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Specialization</label>
          <input
            type="text"
            name="specialization"
            id="specialization"
            value={doctor.specialization}
            onChange={onChange}
            placeholder="Enter doctor's specialization"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Services Offered</label>
          <input
            type="text"
            name="servicesOffered"
            id="servicesOffered"
            value={doctor.servicesOffered}
            onChange={onChange}
            placeholder="Enter doctor's services offered"
            required
          />
        </div>
                                {errors.from && <span className="text-danger">description is required</span>}

                                  {/* <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
                                  onClick={toggle}
                                  block
                                  >
                                  Cancel</Button> */}
                                <div>
                                  <Button
                                  color="primary"
                                  // style = {{marginTop: '2rem'}}
                                  onClick={onSubmit}
                                  className={classes.button}
                                  startIcon={<SaveIcon />}
                                  variant="contained"
                                  size="large"
                                  
                                  block
                                  >
                                  Update Details</Button>
                                  </div>
                              </FormGroup>
                              </Form>  
                        </ModalBody>
                </Modal>
            </div>

)
                                }
const mapStateToProps = state => ({
    user: state.auth.user,
    singleDoctor:state.doctor.singleDoctor
  });
export default connect(mapStateToProps, { updateDoctorDetails,getSingleDoctor, clearErrors,
    })(EditDoctorDetail);



 

