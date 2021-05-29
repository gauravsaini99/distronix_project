import React, { useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {booksArr} from './books';
import { useParams } from 'react-router-dom';
import pic from '../assets/1.jpeg';
import { bookActions, pageActions } from '../store/index';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory}  from 'react-router-dom';
import GetEntireBookContents from './GetEntireBookContents';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import '../styles/searchbooks.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      backgroundColor: 'gray',
      width: '900px',
      height: '162px',
      marginTop: '0px',
      cursor: 'pointer'
    },
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(10),
      },
    },
    paper2: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        width: '950px',
        marginTop: '100px',
        left: '22%',
        position: 'relative',
        paddingTop: '40px',
        height: '650px',
        overflow: 'auto',
        paddingLeft: '25px'
      },
    },
    center: {
      position: 'absolute',
      left: '51%',
      top: '15%',
      transform: 'translate(-50%, -50%)',
    },
    textfield: {
      '& > *': {
        margin: theme.spacing(1),
        width: '75ch',
      },
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
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

export default function BookCards() {
    const params = useParams();
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [foundBook, setFoundBook] = React.useState({book: [], id: 0});
    const [foundBook_, setFoundBook_] = React.useState({book: [], id: 0});
    const bookSelected = useSelector(state => state.book);
    const books = useSelector(state => state.login.books);
    const userLoggedIn = useSelector(state => state.login.loggedInUser);
    const [clicked, setClicked] = React.useState({book: {}, clicked: false});
    const [myBooks, setMyBooks] = React.useState([]);
    const [searchedBook, setSearchedBook] = React.useState('');
    const [typed, setTyped] = React.useState('');
    const page = useSelector(state => state.page.page);
    const searched = useSelector(state => state.book.search);
    const searchedString = useRef({search: searchedBook});

    useEffect(() => {
      console.log(page, 'page');
      if(page === 'ShowMyBooks') {
        console.log(searchedString.current.search, 'searched string');
      }
    }, [page]);

    const handleChangeSearchBox = (event) => {
      setTyped(event.target.value);
    }
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      setSearchedBook(typed);
      searchedString.current = {search: typed};
    }
    
    useEffect(() => {
      console.log(userLoggedIn, 'logged in user details from search page')
    }, [userLoggedIn]);

    useEffect(() => {
      if(params.param === 'showmybooks') {
        console.log(' i m here now now now ')
        let books = userLoggedIn.booksRented;
        let foundRest = [];
        for(let i=0; i<books.length; i++) {
          let allDetails = booksArr.filter(obj => obj.title === books[i].title);
          if(allDetails.length) {
            foundRest.push(allDetails);
          }
        }
        console.log(foundRest, 'all Details');
        setMyBooks(foundRest);
      }
    }, [params.param]);

    const handleClick = (book, id) => {
      setClicked({book: book, clicked: true});  
      dispatch(pageActions.currentPage({page: 'GetBookSpecs'}));
      history.push(`/drawer/getbookspecs/${id}`);
    }

    const handleSearchedClick = (book) => {
      setClicked({book: book, clicked: true});
      history.push(`/drawer/getbookspecs/${book.id}`)
    }

    useEffect(() => {
      console.log('searched book wala useEffect');
      if(searchedString.current.search !== '' && params.param !== 'showmybooks') {
        let found;
        found = booksArr.filter(book => {
          return book.title.toLowerCase().includes(searchedString.current.search.toLowerCase())
        })
        setFoundBook({book: found});
      }
      else if((searchedString.current.search!== '' || searchedString.current.search !== undefined) && params.param === 'showmybooks') {
        let found;
        found = userLoggedIn.booksRented.filter(book => {
          return book.title.toLowerCase().includes(searchedString.current.search.toLowerCase())
        })
        setFoundBook_({book: found});
        console.log(found, 'searched book');
      }
    }, [searchedString.current.search, page]);

    return (
        <React.Fragment>
        {clicked.clicked ? <GetEntireBookContents title={clicked.book.title} author={clicked.book.author} /> : null}
        <div className={clsx(classes.paper, classes.center)}>
          <Paper elevation={3}>
            <div className={classes.textfield}>
              <TextField id="outlined-basic" label="Search Books" variant="outlined" onChange={handleChangeSearchBox} value={typed} />
              &emsp;
              <Button variant="contained" className={classes.button} style={{width: '20ch'}} onClick={handleSearchSubmit}>Search Book</Button>
            </div>
          </Paper>
        </div>
        <div className={classes.paper2}>
        <Paper elevation={6}>
        {params.param === 'showmybooks' ?
          searchedString.current.search === '' ? myBooks.map((obj, i) => (
            <React.Fragment>
            <Card key={i} className={classes.root} style={{cursor: 'default'}}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <CardMedia 
                component="img"
                style={{float: 'left', paddingRight: '15px'}}
                height= "128px"
                className={classes.cover}
                image={obj[0].pic}
                />
                <Typography component="h5" variant="h5">
                    {obj[0].title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {obj[0].author}
                </Typography>
                </CardContent>
            </div>
            </Card>
            <br/> <br/>
            </React.Fragment>
        )) 
        : foundBook_.book.map((obj, i) => (
              <React.Fragment>
              <Card key={i} className={classes.root} style={{cursor: 'default'}}>
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
          :  
          searchedString.current.search === '' ? booksArr.map((obj, i) => (
            <React.Fragment>
            <Card key={i} className={classes.root} onClick={() => handleClick(obj, i)}>
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
              <Card key={i} className={classes.root} onClick={() => handleSearchedClick(obj)}>
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
      </Paper>
      </div>
      </React.Fragment>
    );
}