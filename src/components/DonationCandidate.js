import {Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme, Typography, responsiveFontSizes } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/DonationCandidate";
import DonationCandidateForm from "./DonationCandidateForm";
import {withStyles} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useToasts} from "react-toast-notifications";
import header from "../Untitled-3.png";

//implement style
const styles = theme =>({
    root:{
        "& .MuiTableCell-head":{
            fontSize:"85%"
        },
        "& .MuiTableCell-body":{
            fontSize: '80%'
        },
   
     },
    paper:{
        margin: theme.spacing(0),
        padding: theme.spacing(1),
        
    },
    head:{
        
        width: '100%'
    }
})

//props.classes
const DonationCandidate = ({classes, ...props}) => {
    
    const [currentID, setCurrentID] = useState(0)
    
    useEffect(()=>{
        props.fetchAllDCandidates()
        //whenever x has changed inside here something can be executed
        
    },[]) 
//componentDidMount altenative
    
    const {addToast} = useToasts()
    const onDelete = id =>{
        
        if(window.confirm("Are you sure you want to delete this record?")){
            props.deleteCandidate(id,()=>addToast("Deleted successfully", {appearance:'info'}))
        }
    }

    return (
        <Grid>
        <Grid><img src={header} slt='logo' className={classes.head}></img></Grid>
        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={3}>
                <Grid item sm= {12} md={6}>
                    <DonationCandidateForm {...({currentID, setCurrentID})}/>
                </Grid>
                <Grid item sm= {12} md={6}>
                    <TableContainer component={Paper}>
                        
                        <Table className={classes.root} aria-label="simple table">
                            
                            <TableHead >
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Type</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableBody>
                                {props.donationCandidateList.map((record,index)=>{
                                    return (<TableRow key={index}>
                                        <TableCell>{record.fullName}</TableCell>
                                        <TableCell>{record.mobile}</TableCell>
                                        <TableCell>{record.bloodType}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button><EditIcon color="primary" onClick={()=>{setCurrentID(record.id)}}/></Button>
                                                <Button><DeleteIcon color="secondary" onClick={()=>onDelete(record.id)} /></Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                        
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
        </Grid>
    );
}

const mapStateToProps = state=>(
    {donationCandidateList: state.donationCandidate.list}
)


const mapActionToProps = {
    fetchAllDCandidates : actions.fetchAll,
    deleteCandidate: actions.deleteAction
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DonationCandidate));