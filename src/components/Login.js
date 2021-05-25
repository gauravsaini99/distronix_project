import React, { Fragment, useState, useEffect } from 'react';
import '../styles/login.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { loginActions } from '../store/index';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory}  from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    root: {
      minWidth: 400,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 28,
      textAlign: 'center'
    },
    pos: {
      marginBottom: 12,
    },
});

const useStylesTF = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
}));

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [clicked, setClicked] = useState(false);

    // const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setState({ ...state, open: false });
    };

    const dispatch = useDispatch();
    const passed = useSelector(state => state.login.passed);

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const classesTF = useStyles();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const openSnackbar = (newState) => {
      if(username === '' || password === '' || !passed) { 
        setState({open: true, ...newState});
      }
      else if(passed){
        setState({open: true, ...newState})
      }
    } 


    const handleSubmit = () => {
        setClicked(true);
        dispatch(loginActions.checkCredentials({username: username, password: password}));
        openSnackbar({ vertical: 'bottom', horizontal: 'center' });
    }

    const redirectIt = () => {
      console.log('redirect it!');
      dispatch(loginActions.resetPassed());
      history.push('/searchbooks');
    }

    useEffect(() => {
      if(passed) {
        redirectIt();
      }
    }, [passed]);

    return (
        <Fragment>
            <div className="center">
            <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Login
                </Typography>
                <form className={classesTF.root} noValidate autoComplete="off">
                <TextField
                    id="standard-normal-helper-text"
                    label="User Name"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <br/><br/>
                <TextField
                    id="standard-normal-helper-text"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br/>
                <br/><br/>
                </form>
            </CardContent>
            <CardActions>
                <Button variant="contained" style={{margin: 'auto'}} onClick={handleSubmit}>Submit</Button>
            </CardActions>
            </Card>
            </div>
            <Snackbar 
              open={open} 
              autoHideDuration={1000} 
              onClose={handleClose}
              anchorOrigin={{ vertical, horizontal }}
              key={vertical + horizontal}
            >
            <Alert onClose={handleClose} severity={!passed ? "error": "success"}>
              {clicked && username === '' && password === '' ? 'Enter Credentials !' : clicked && username === '' ? 'Enter username !' : clicked && password === '' ? 'Enter Password !': clicked && !passed? 'Credentials Wrong !' : 'Successfully Logged In !'}
            </Alert>
            </Snackbar>

        </Fragment>
    );
};

export default Login;


