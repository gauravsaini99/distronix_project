import React, { useState, useEffect } from 'react';
import '../styles/wallet.cs';
import WalletPic from '../assets/wallet.png';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../store/index';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(90),
      },
    },
    root_: {
        maxWidth: 545,
        position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    },
    media: {
        height: 300,
    },
}));

const Wallet = (props) => {
    const classes = useStyles();
    const params = useParams();
    const walletLoggedInUser = useSelector(state => state.login.loggedInUser);

    useEffect(() => {
        let user_ = JSON.parse(localStorage.getItem('user'));
        console.log(user_, 'user from local storage');
        console.log(walletLoggedInUser, 'logged in users account info')
    }, []);

    return (
        <React.Fragment>
            <Card className={classes.root_}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                component="img"
                image={WalletPic}
                style={{float: 'top', scrollPaddingTop: '15px', objectFit: 'cover'}}
                height= "inherit"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    User: {walletLoggedInUser.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Amount in Wallet: {walletLoggedInUser.wallet}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    See Transaction History
                </Button>
            </CardActions>
            </Card>
        </React.Fragment>
    );
}

export default Wallet;