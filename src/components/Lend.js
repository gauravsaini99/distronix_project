import React, { useState, useEffect } from 'react';
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


const Lend = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const params = useParams();
    const bookSelected = useSelector(state => state.book);
    const walletLoggedInUser = useSelector(state => state.login.loggedInUser);
    const booksLeft = useSelector(state => state.login.books);
    const [copyBook, setCopyBook] = useState(0);

    const handlePay = (e) => {
        let today = new Date();
        // let datestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let arr = walletLoggedInUser.booksRented.filter(book => book.title === bookSelected.title);
        console.log(arr, 'arr', bookSelected.title, 'book selected title');
        if(copyBook > 0 && ( !walletLoggedInUser.booksRented.filter(book => book.title === bookSelected.title).length || !walletLoggedInUser.booksRented.length) ) {
            let amountToPay = parseFloat(bookSelected['rent cost'].replace('$', ''));
            let walletLeft = parseFloat(walletLoggedInUser.wallet.replace('$', '')) - amountToPay;
            dispatch(loginActions.rentBook({leftNow: '$' + walletLeft.toString(), title: bookSelected.title, id: bookSelected.id, date: today}));
        }
    }

    useEffect(() => {
        localStorage.setItem('transaction-history', JSON.stringify(walletLoggedInUser));
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
        </React.Fragment>
    );
};

export default Lend;
