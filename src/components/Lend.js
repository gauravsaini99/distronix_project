import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions, pageActions } from '../store/index';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom'; 


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

let backListener;

const Lend = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const bookSelected = useSelector(state => state.book);
    const walletLoggedInUser = useSelector(state => state.login.loggedInUser);
    const booksLeft = useSelector(state => state.login.books);
    const [copyBook, setCopyBook] = useState(0);
    const [userData, setUserData] = useState();
    const [clicked, setClicked] = useState(false);
    const [flag, setFlag] = useState(0);

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
    const openSnackbar = (newState) => {
          setState({open: true, ...newState});
    }

    useEffect(() => {
        backListener = history.listen((location, action) => {
            if (action === "POP") {
              console.log('i m on back button press');
              dispatch(pageActions.currentPage({page: 'GetBookSpecs'}));
              history.push(`/drawer/searchbooks/getbookspecs/${bookSelected.id}`);
            }
        });
        return () => {
            backListener();
        }
    }, []);


    useEffect(() => {
        let user_data = JSON.parse(localStorage.getItem(`transaction-history`));
        setUserData(user_data);
    }, []);

    const handlePay = () => {
        setClicked(true);
        openSnackbar({ vertical: 'bottom', horizontal: 'center' });
        let today = new Date();
        let arr = walletLoggedInUser.booksRented.filter(book => book.title === bookSelected.title);
        console.log(arr, 'arr', bookSelected, 'book selected');
        if(copyBook > 0 && ( !walletLoggedInUser.booksRented.filter(book => book.title === bookSelected.title).length || !walletLoggedInUser.booksRented.length) ) {
            let amountToPay = parseFloat(bookSelected['rent cost'].replace('$', ''));
            let walletLeft = parseFloat(walletLoggedInUser.wallet.replace('$', '')) - amountToPay;
            dispatch(loginActions.rentBook({leftNow: '$' + walletLeft.toString(), title: bookSelected.title, author: bookSelected.author, pic: bookSelected.pic, id: bookSelected.id, date: today}));
            setFlag(1);
        }
        else {
            setFlag(0);
        }
    }

    useEffect(() => {
        localStorage.setItem(`transaction-history`, JSON.stringify(walletLoggedInUser));
    }, [walletLoggedInUser]);

    useEffect(() => {
        let keys = Object.keys(booksLeft);
        let foundKey;
        keys.map((key, i) => {
            if(key.slice(-1) === bookSelected.id.toString()) {
                foundKey = 'book' + bookSelected.id.toString();
            }
        });
        let updatedValue;
        for(const [key, value] of Object.entries(booksLeft)) {
            if(key === foundKey) {
                updatedValue = value.copies;
            }
        }
        setCopyBook(updatedValue);
    }, [booksLeft]);

    return (
        <React.Fragment>
            <Card className={classes.root_}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                component="img"
                image={bookSelected.pic}
                style={{float: 'top', scrollPaddingTop: '15px', objectFit: 'cover'}}
                height= "inherit"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {bookSelected.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Author: {bookSelected.author}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Left: {copyBook}
                    <br/>
                    Days: 60
                    <br/>
                    Rent: {bookSelected['rent cost']}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={(e) => handlePay(e)}>
                    Pay for Book
                </Button>
            </CardActions>
            </Card>
            <Snackbar 
              open={open} 
              autoHideDuration={1000} 
              onClose={handleClose}
              anchorOrigin={{ vertical, horizontal }}
              key={vertical + horizontal}
            >
            <Alert onClose={handleClose} severity={!flag ? "error": "success"}>
              {clicked && !flag && copyBook < 0 ? 'Not Available !' : clicked && !flag && copyBook > 0 ? "You already have this book !" : "Successfully Rented !"}
            </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default Lend;
