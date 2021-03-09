import axios from 'axios';

import {
ADD_DOCTOR,
GET_DOCTORS,
GET_SINGLE_DOCTOR,
DOCTOR_FILTER,
DOCTOR_SEARCH_FILTER
} from './types';
import { setAlert } from './alertActions';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';


export const getDoctors = (filterObj) => async(dispatch , getState) => {

  const approvedUsers = await axios.get('/api/auth/getApprovedDoctors', tokenConfig(getState));
  const doctors = await axios.get('/api/doctors',tokenConfig(getState));
    const approvedArr = [];

    let categoryApprovedArr = [];
    let searchArr=[]
    const dispatchArr = (arr) => {
      const sortedArr=arr.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })
      dispatch({
        type: GET_DOCTORS,
        payload: sortedArr
        });
      }

    doctors.data.map(doctor => 
    approvedUsers.data.map(user => {
    if(user._id === doctor._id)
      approvedArr.push(doctor);
    
  })
  )

  const filterByCategory = (filterObj) => {
    if(filterObj.category==='All')
      return approvedArr
    else{
      console.log("no")
    categoryApprovedArr=approvedArr.filter(doctor=>{
    return doctor.category === filterObj.category})
          return categoryApprovedArr
    }
  }

  if(filterObj.id ==="searchFilter"){
      if(filterObj.name&&filterObj.category){
        categoryApprovedArr = approvedArr.filter(doctor => {
          return doctor.category !== filterObj.category
                 })
                 searchArr = categoryApprovedArr.filter(doctor => {
                  return doctor.name.toLowerCase().includes(filterObj.name.toLowerCase())
                })   
                dispatchArr(searchArr) 
      }
      
        if(filterObj.category){
        let dispatchArray = filterByCategory(filterObj)
        dispatchArr(dispatchArray);
      }
       

        if(filterObj.name){
          searchArr=approvedArr.filter(doctor=>{

            return doctor.name.toLowerCase().includes(filterObj.name.toLowerCase())
          })   
          searchArr.sort(function(a,b) {
            return a.name.indexOf(filterObj.name) - b.name.indexOf(filterObj.name);
        });    
          dispatchArr(searchArr)      
        }
      }


    else{

      if(filterObj.category){
        approvedArr = filterByCategory(filterObj)
      }

      if(filterObj.fee){
        console.log("sasd",approvedArr)
        dispatchArr(approvedArr.filter(doctor =>
          doctor.fee < filterObj.fee))
          //dispatchArr(filteredArray)
        
      }

      if(filterObj.exp){
        let dispatchArray = filterByCategory(filterObj)
        
      }
      ////todoooooooooooooooooooooooooooooooooooooooo

      // if(filterObj.likes){
      //   let dispatchArray = filterByCategory(filterObj)
        
      // }
    }
      
  };



export const getSingleDoctor = (id) => async (dispatch , getState) => {
    const doctor=await axios.get(`/api/doctors/${id}`,tokenConfig(getState))
    .then(res => {
    dispatch({
    type: GET_SINGLE_DOCTOR,
    payload: res.data
    });
    return res.data
    })
    .catch(error => dispatch(setAlert(`${error}`, 'danger')));
};

export const setSearchFilter = (obj) => ({
type: DOCTOR_SEARCH_FILTER,
payload: obj,
});

export const setDoctorsFilter = (obj) => ({
  type: DOCTOR_FILTER,
  payload: obj,
  });