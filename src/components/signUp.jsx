import { useHistory } from 'react-router-dom';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React,{useState} from 'react';
import './../styles/signup.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useEffect } from 'react';

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [email,setEmail]=useState('');
  const [age,setAge]=useState('');
  const [password,setPassword]=useState('');
  const [status,setStatus]=useState('');
  const [city,setCity]=useState('');
  const [blood,setBlood]=useState('');
  const [gender,setGender]=useState('');
  let [avatar,setAvatar]=useState(null);
  const [lati,setLati]=useState(null);
  const [long,setLong]=useState(0);
  const classes = useStyles();

  const location = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
    setLong(position.coords.longitude);
    setLati(position.coords.latitude);
    })
  }
useEffect(()=>{
location();
},[])

  const Sign= async ()=>{


    if(lati==null){
      location();
alert('Please allow to access location first')
    }
    else{
      var formData = new FormData();
      formData.append('avatar',avatar);
      formData.append('name',name);
      formData.append('phone',phone);
      formData.append('long',long);
      formData.append('lati',lati);
      formData.append('address',address);
      formData.append('email',email);
      formData.append('age',age);
      formData.append('password',password);
      formData.append('status',status);
      formData.append('city',city);
      formData.append('blood',blood);
      formData.append('gender',gender);
  
      // var obj={
      //   avatar:avatar,
      //   name,phone,
      //   long,lati,
      //   address,email,
      //   age,password,
      //   status,city,
      //   blood,gender,
      // };  
    await  axios.post('https://minhaj-bloodbank.herokuapp.com/',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
  
  history.push('/');
    
}  

};


const upload = (e) => {
  if(e.target.files.length==1){
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded
      reader.readAsBinaryString(file)
    }
  }
}
const _handleReaderLoaded = (readerEvt) => {
  let binaryString = readerEvt.target.result;
  avatar = btoa(binaryString)
  console.log('infunction',avatar)
}



return (
    <div className='Main'>
      <br />
    <Container className='signUp_parent' maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar} id='avatar'>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="Name"
                value={name}
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={e=>setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='Phone'
                label="Phone No."
                name="Phone"
                autoComplete="phone"
                onChange={e=>setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={e=>setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                onChange={e=>setAge(e.target.value)}
              />
            </Grid>


            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e=>setPassword(e.target.value)}
              />
              </Grid>
              <Grid item xs={4}>
              <InputLabel>Status</InputLabel>
                <Select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                >
                  <MenuItem value='Donor'>Donor</MenuItem>
                  <MenuItem value='Needer'>Needer</MenuItem>
                </Select>

              </Grid>



              <Grid item xs={4}>
              <TextField
                fullWidth
                name="City"
                label="City"
                type="text"
                id="city"
                value={city}
                onChange={e=>setCity(e.target.value)}
              />
              </Grid>


              <Grid item xs={4}>
              <InputLabel>Blood Group</InputLabel>
                <Select
                value={blood}
                onChange={(e)=>setBlood(e.target.value)}
                >
                  <MenuItem value='A'>A</MenuItem>
                  <MenuItem value='B'>B</MenuItem>
                  <MenuItem value='AB'>AB</MenuItem>
                  <MenuItem value='O'>0</MenuItem>
                </Select>

              </Grid>


              <Grid item xs={2}>
              <InputLabel>Gender</InputLabel>
                <Select
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                </Select>
             </Grid>


              <Grid item xs={6}>
              <input type="file" name="avatar" id="avatar_img" accept="image/*"
                onChange={(e)=>upload(e)}  
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            id='submit'
            onClick={()=>Sign()}
            >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" style={{color:'black'}}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
    </Container>
    </div>
  );
}



