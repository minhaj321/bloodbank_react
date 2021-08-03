import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {

    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));
const Content = ({status,group}) => {
  var userEmail = localStorage.getItem('email')
  var userName = localStorage.getItem('name')
const classes = useStyles();
var [contentData,setContentData]=useState([]);
    useEffect(()=>{
    const getData= async () =>{
      var token = localStorage.getItem('token');
            var {data}= await axios.get(`https://minhaj-bloodbank.herokuapp.com/data/${status}/${group}/${token}`);
              if(data==='Your Token Is Expired'){
                alert(data);

              }
              else{

                contentData=[];
                data.map((v)=>{
                contentData.push(v);
                })
            setContentData(contentData);
              }
    }
    getData();
    },[status,group])
    

    return ( 
        <div>
            {
                contentData &&
                contentData.map((v,i)=>{
                   return( 
                   <div key={i}>
             <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {v.name}
            </Typography>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
        <Grid item xs>
            <Typography gutterBottom variant="h6">
              {v.email}
            </Typography>
          </Grid>
          </Grid>
          <Grid item xs>
                  <img src={`data:image/jpeg;base64,${v.avatar}`} alt="Avatar" />
          </Grid>

        <Typography color="textSecondary" variant="body2">
                    {v.address}
        </Typography>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <div>
          <Chip className={classes.chip} label={'Age : '+ v.age} />
          <Chip className={classes.chip} label={v.gender} />
          <Chip className={classes.chip} label={v.city} />
          <Chip className={classes.chip} label={v.phone} />
        <Link style={{textDecoration:'none'}}         
         to={{pathname:"/Map",state:{long:v.long ,lati:v.lati} }}
        >
        <Chip style={{ cursor:'pointer'}}
        className={classes.chip} label='Map View' color="primary"/>
        </Link>
        
        <Link style={{textDecoration:'none'}}
         to={{pathname:"/chat" ,state:{dataEmail : v.email , dataName : v.name , userName , userEmail}}}
        >
        <Chip 
        style={{ cursor:'pointer'}}
        className={classes.chip} label='Chat' color="secondary"/>
        </Link>
        </div>
      </div>
    </div>
                )
                })
            }
        </div>
     );
}
 
export default Content;