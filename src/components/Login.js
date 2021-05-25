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

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 28,
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [clicked, setClicked] = useState(false);

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

    const handleSubmit = () => {
        setClicked(true);
        dispatch(loginActions.checkCredentials({username: username, password: password}));
    }

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
                <p>{clicked && username === '' ? 'Enter username !' : clicked && password === '' ? 'Enter Password !': clicked && !passed? 'Credentials Wrong !' : ''}</p>
                </form>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </CardActions>
            </Card>
            </div>
        </Fragment>
    );
};

export default Login;


