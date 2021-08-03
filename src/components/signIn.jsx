import {Link as RouteLink} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './../styles/login.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin() {
  const history = useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const classes = useStyles();
  
  

  // login Start
  const login = async () =>{
      var data={
        email,password
      }
    var res= await axios.post('https://minhaj-bloodbank.herokuapp.com/login/',data)
    if(res.data.name!==''){
      console.log(res.data);
      localStorage.setItem('name',res.data.name);
      localStorage.setItem('email',res.data.email);
      localStorage.setItem('avatar',res.data.avatar);
      localStorage.setItem('token',res.data.token);
    history.push('/Display');
      }
  }

  
  
  
  
  return (
    <div className='Main_login'>
      <br /><br /><br />
    <Container className='login_parent' maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar id='avatar' className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            id='submit'
            className={classes.submit}
            onClick={()=>login()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouteLink to='/signup' style={{color:'black'}}>
                {"Don't have an account? Sign Up"}
              </RouteLink>
            </Grid>
          </Grid>
      </div>
    </Container>
    </div>
  );
}





