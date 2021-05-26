import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {bookActions} from '../store/index';
import {booksArr} from './books';
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
  

const GetEntireBookContents = (props) => {
    const classes = useStyles();
    const params = useParams();
    const dispatch = useDispatch();
    const bookSelected = useSelector(state => state.book);

    const getIt = () => {
        console.log(params.bookId, 'params')
        console.log(booksArr, 'booksArr from GetEntireBooksContents')
        let selectedBook;
        for(let i =0; i<booksArr.length; i++) {
            if(i === parseInt(props.bookId)) {
                selectedBook = booksArr[i];
            }
        }
        return selectedBook;
    }

    useEffect(() => {
        console.log(' i m in book contents ')
        let book = getIt();
        console.log(book);
        dispatch(bookActions.selectedBook({selectedBookContents: book}));
    }, []);

    useEffect(() => {
        console.log('bookSelected by panav', bookSelected.pic);
    }, [bookSelected]);
 
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
                    Left: {bookSelected.copies}
                    <br/>
                    Rent: {bookSelected['rent cost']}
                    <br/>
                    Pages: {bookSelected.pages}
                    <br/>
                    ISBN: {bookSelected.ISBN}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Rent It
                </Button>
            </CardActions>
            </Card>
        </React.Fragment>
    );
}

export default GetEntireBookContents;
