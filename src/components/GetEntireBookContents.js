import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {bookActions, pageActions} from '../store/index';
import { useHistory } from 'react-router-dom'; 
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

let backListener;

const GetEntireBookContents = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const params = useParams();
    const dispatch = useDispatch();
    const bookSelected = useSelector(state => state.book);
    const booksLoginState = useSelector(state => state.login.books);
    const page = useSelector(state=> state.page.page);
    const [copies, setCopies] = React.useState(0);

    useEffect(() => {
        dispatch(pageActions.currentPage({page: 'GetBookSpecs'}))
    }, []);

    useEffect(() => {
        console.log(page, 'page');
    }, [page]);

    
    useEffect(() => {
        backListener = history.listen((location, action) => {
            if (action === "POP") {
              console.log('i m on back button press');
              dispatch(pageActions.currentPage({page: 'SearchLibrary'}));
              history.push('/drawer/searchbooks/searchlibrary');
            }
        });
        return () => {
            backListener();
        }
    }, []);

    const getIt = () => {
        console.log(props, 'props')
        let selectedBook;
        for(let i =0; i<booksArr.length; i++) {
            if(i === parseInt(params.param)) {
                selectedBook = booksArr[i];
            }
        }
        
        let keys = Object.keys(booksLoginState);
        let foundKey;
        keys.map((key, i) => {
            if(key.slice(-1) === params.param) {
                foundKey = 'book' + params.param;
            }
        });

        let updatedValue;
        for(const [key, value] of Object.entries(booksLoginState)) {
            if(key === foundKey) {
                updatedValue = value.copies;
            }
        }
        return {selectedBook: selectedBook, value: updatedValue};
    }

    useEffect(() => {
        let result = getIt();
        setCopies(result.value);
        dispatch(bookActions.selectedBook({selectedBookContents: result.selectedBook}));
    }, [params.param, props.bookId]);

    const handleLend = () => {
        dispatch(pageActions.currentPage({page: 'Lend'}));
        history.push(`/drawer/lend`);   
    }
 
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
                    Left: {copies}
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
                <Button size="small" color="primary" onClick={() => handleLend()}>
                    Rent It
                </Button>
            </CardActions>
            </Card>
        </React.Fragment>
    );
}

export default GetEntireBookContents;
