import Content from "./content.jsx";
import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './../styles/display.css';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Display = () => {
const history = useHistory();
    const [status,setStatus]=useState('Donor');
    const [group,setGroup]=useState('A');
    var name= localStorage.getItem('name');   
    var avatar= localStorage.getItem('avatar');   
    const classes = useStyles();
    

    const logOut=()=>{
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('avatar');
      history.push('/')
    }
    
        return (
          <div className={classes.root}>
          <div className='header_div'>
            <p>{name}</p>
            <img src={`data:image/jpeg;base64,${avatar}`} alt="avatar"/>
            <button onClick={()=>logOut()}>LogOut</button>
          </div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper
                className={ status==='Donor' ? 'selectedStatus' :    'paper' }
                onClick={()=>setStatus('Donor')}>Donor</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                className={ status=== 'Needer' ? 'selectedStatus'  :    'paper' }
                onClick={()=>setStatus('Needer')}>Needer</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper 
                className={group === 'A' ? 'selectedGroup' :    'paperA' }
                onClick={()=>setGroup('A')}
                >Group A</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper 
                className={group === 'B' ? 'selectedGroup' :    'paperA' }
                onClick={()=>setGroup('B')}
                >Group B</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper 
                className={group === 'O' ? 'selectedGroup' :    'paperA' }
                onClick={()=>setGroup('O')}
                >Group O</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper 
                className={group === 'AB' ? 'selectedGroup' :    'paperA' }
                onClick={()=>setGroup('AB')}
                >Group AB</Paper>
              </Grid>

            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Content status={status} group={group}/>
            </Grid>
            <Grid item xs={2}></Grid>


            </Grid>
          </div>
        ); 
}
 
export default Display;