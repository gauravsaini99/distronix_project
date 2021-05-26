import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {booksArr} from './books';
import pic from '../assets/1.jpeg';
import { bookActions } from '../store/index';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory}  from 'react-router-dom';
import GetEntireBookContents from './GetEntireBookContents';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      backgroundColor: 'gray',
      width: '900px',
      height: '162px',
      marginTop: '10px',
      cursor: 'pointer'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '0 1 auto',
    },
    cover: {
      width: 100,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

export default function BookCards(props) {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [foundBook, setFoundBook] = React.useState({book: [], id: 0});
    const bookSelected = useSelector(state => state.book);
    const [clicked, setClicked] = React.useState({book: {}, clicked: false});

    const handleClick = (book, id) => {
      console.log('i m clicked');
      setClicked({book: book, clicked: true});  
      history.push(`/drawer/getbookspecs/${id}`);
    }

    const handleSearchedClick = (book) => {
      setClicked({book: book, clicked: true});
      history.push(`/drawer/getbookspecs/${book.id}`)
    }

    useEffect(() => {
        console.log(bookSelected, 'book in redux');
    }, [bookSelected]);

    useEffect(() => {
      if(props.search !== '') {
        let found;
        found = booksArr.filter(book => {
          return book.title.toLowerCase().includes(props.search.toLowerCase())
        })
        setFoundBook({book: found});
      }
    }, [props.search])

    useEffect(() => {
      console.log(clicked.book.title);
    }, [clicked])
    return (
        <React.Fragment>
        {clicked.clicked ? <GetEntireBookContents title={clicked.book.title} author={clicked.book.author} /> : null}
        {props.search=== '' ? booksArr.map((obj, i) => (
            <React.Fragment>
            <Card className={classes.root} onClick={() => handleClick(obj, i)}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <CardMedia 
                component="img"
                style={{float: 'left', paddingRight: '15px'}}
                height= "128px"
                className={classes.cover}
                image={obj.pic}
                />
                <Typography component="h5" variant="h5">
                    {obj.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {obj.author}
                </Typography>
                </CardContent>
            </div>
            </Card>
            <br/> <br/>
            </React.Fragment>
        )) 
        : foundBook.book.map((obj, i) => (
              <React.Fragment>
              <Card className={classes.root} onClick={() => handleSearchedClick(obj)}>
              <div className={classes.details}>
                  <CardContent className={classes.content}>
                  <CardMedia 
                  component="img"
                  style={{float: 'left', paddingRight: '15px'}}
                  height= "128px"
                  className={classes.cover}
                  image={obj.pic}
                  />
                  <Typography component="h5" variant="h5">
                      {obj.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                      {obj.author}
                  </Typography>
                  </CardContent>
              </div>
              </Card>
              <br/> <br/>
              </React.Fragment>
          )) 
        }
        </React.Fragment>
    );
}