import { FormControl, Grid, InputLabel, TextField, MenuItem, Select, makeStyles, Button, FormHelperText, Box } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import useForm from "./useForm";
import {connect} from "react-redux";
import * as actions from "../actions/DonationCandidate";
import { useToasts } from "react-toast-notifications";
import { FormatAlignCenter } from "@material-ui/icons";

const styles = makeStyles(theme => ({
    //define css class style
    
    root:{
        "& .MuiTextField-root":{
                margin: theme.spacing(1),
                width:200,
               
            },
            textAlign: 'center'
        },
    formControl:{
            margin: theme.spacing(1),
          
            width: 200
        },
      
    smMargin:{
            margin: theme.spacing(2.5)
            
        },
        
    
}));

const initialValue = {
    fullName:"",
    mobile:"",
    email:"",
    age:"",
    bloodType:"",
    address:""
}

const DonationCandidateForm = (props) => {
    //declare state property
   // const [values, setValues] = useState(initialValue)
    const classes = styles();
    const {addToast} = useToasts();
    
    const validate = (fieldValues = values) =>{
        let temp = {...errors}
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName !== "" ? "" : "This field is requried."
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile !== "" ? "" : "This field is requried."
        if('bloodType' in fieldValues)
            temp.bloodType = fieldValues.bloodType !== "" ? "" : "This field is requried."
        if('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email)? "":"Email is not valid."
        setErrors({
            ...temp
        })
        if(fieldValues === values)
            return Object.values(temp).every(x=> x === "")
    }
    const {values,
        setValues,
        errors,
        setErrors,
    handleInputChange,
    reset} = useForm(initialValue, validate, props.setCurrentID);
    
  
    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(InputLabel.current.offsetWidth);
    },[]);


    //handle submission
    const handleSubmit = e =>{
        e.preventDefault()
        if (validate()){
            const onSuccess = ()=>{
                reset()
                addToast("Submitted successfully", {appearance:'success'})
            }
            if(props.currentID === 0){
                props.createCandidate(values,onSuccess)}
            else{
                props.updateCandidate(props.currentID,values,onSuccess)}
        }
        
    }

    React.useEffect(() => {
        if(props.currentID !== 0)
            setValues({
                ...props.donationCandidateList.find(x=>x.id === props.currentID)
            })
            setErrors({})
        
    }, [props.currentID])
    
    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={12} md={6}>
                    <TextField name="fullName" 
                    variant="outlined" 
                    label= "Full Name" 
                    value={values.fullName} 
                    onChange={handleInputChange}
                    //condition in components
                    {...(errors.fullName && {error:true, helperText:errors.fullName})}
                    />
                    <TextField name="email" 
                    variant="outlined" 
                    label= "Email" 
                    value={values.email} 
                  //  className={classes.text}
                    onChange={handleInputChange}
                    {...(errors.email && {error:true, helperText:errors.email})}
                    />
                    <FormControl variant="outlined" className={classes.formControl}
                        {...(errors.bloodType && {error:true})}
                    >
                        <InputLabel ref={InputLabel}>Blood Type</InputLabel>
                        <Select 
                            name="bloodType"
                            value={values.bloodType}
                            onChange={handleInputChange}
                            labelWidth = {labelWidth}
                            >
                        <MenuItem value="">Select blood type</MenuItem>
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                        </Select>
                        {errors.bloodType && <FormHelperText>{errors.bloodType}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField name="mobile" 
                    variant="outlined" 
                    label= "Mobile" 
                    value={values.mobile} 
                  //  className={classes.text}
                    onChange={handleInputChange}
                    {...(errors.mobile && {error:true, helperText:errors.mobile})}
                    />
                    <TextField name="age" 
                    variant="outlined" 
                    label= "Age" 
                    value={values.age} 
                    //className={classes.text}
                    onChange={handleInputChange}
                    />
                    
                    <TextField name="address" 
                    variant="outlined" 
                    label= "Address" 
                    value={values.address} 
                   // className={classes.text}
                    onChange={handleInputChange}
                    />
                    <div>
                        <Box display="inline">
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                        className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        </Box>
                        <Box display="inline">
                        <Button
                        variant="contained"
                        size="small"
                        className={classes.smMargin}
                        onClick={reset}
                        >
                            Reset
                        </Button>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </form>
        );
}

const mapStateToProps = state=>(
    {donationCandidateList: state.donationCandidate.list}
)


const mapActionToProps = {
    createCandidate : actions.create,
    updateCandidate: actions.update,

}

export default connect(mapStateToProps, mapActionToProps)(DonationCandidateForm);