import '../styles/wallet.css';
import WalletPic from '../assets/wallet.png';
import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../store/index';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React, { useState, useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { booksArr } from './books';
import {useHistory} from 'react-router-dom';

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

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
        left: '20%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    heading: {
        position: 'absolute',
        left: '51%',
        top: '17%',
        transform: 'translate(-50%, -50%)'
    },
    accordianCover: {
        maxWidth: 500,
        maxHeight: 500,
        padding: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        position: 'absolute',
        top: '50%',
        left: '60%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto'
    },
    scrollableCard: {
        maxWidth: 580,
        overflow: 'auto'
    },
    media: {
        height: 300,
    },
}));

let backListener;
const Wallet = (props) => {
    const classes = useStyles();
    const params = useParams();
    const dispatch = useDispatch();
    const walletLoggedInUser = useSelector(state => state.login.loggedInUser);
    const [openAccordian, setOpenAccordian] = useState(false);
    const [expanded, setExpanded] = React.useState('panel1');
    const [restDetails, setRestDetails] = useState([]); 
    const history = useHistory();

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        backListener = history.listen((location, action) => {
            if (action === "POP") {
              console.log('i m on back button press');
              dispatch(pageActions.currentPage({page: 'SearchLibrary'}));
              history.push('/drawer/searchbooks/searchlibrary');
            }
        });

        console.log(walletLoggedInUser, 'logged in users account info');
        let rest = [];
        if(walletLoggedInUser.booksRented.length) {
            for(let i=0; i<walletLoggedInUser.booksRented.length; i++) {
                booksArr.map((book, j) => {
                    if(book.title === walletLoggedInUser.booksRented[i].title) {
                        let d = new Date(walletLoggedInUser.booksRented[i].rentdate);
                        console.log(d, 'd', book.days, 'book days');
                        let dateForReturning = new Date(d.setDate(d.getDate() + book['days']));
                        console.log(dateForReturning);
                        let datestamp = dateForReturning.getFullYear()+'-'+(dateForReturning.getMonth()+1)+'-'+dateForReturning.getDate();
                        rest.push({title: book.title, pic: book.pic, 'rent cost': book['rent cost'], pages: book.pages, dateToReturn: datestamp});
                    }
                })
            }
        }
        console.log(rest, 'rest');
        setRestDetails(rest);
        return () => {
            backListener();
        }
    }, []);


    const openAccord = () => {
        setOpenAccordian(!openAccordian);
    }

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
                <Button size="small" color="primary" onClick={openAccord}>
                    See Transaction History
                </Button>
            </CardActions>
            </Card>
            {openAccordian &&
                <React.Fragment>
                <Typography gutterBottom className={classes.heading} variant="h5" component="h2" color="primary">Purchase History</Typography>
                <Card className={classes.accordianCover}>
                <Card className={classes.scrollableCard}>
                {walletLoggedInUser.booksRented.length ? walletLoggedInUser.booksRented.map((book, i) => (
                    <Accordion key={i} square expanded={expanded === i} onChange={handleChange(i)}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>{book.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <img src={restDetails[i].pic} width={100} height={100} style={{marginRight: '20px'}}/>
                    <Typography>
                        Rent Cost: {restDetails[i]['rent cost']} <br/>
                        Pages: {restDetails[i].pages} <br/>
                        Return Date: {restDetails[i].dateToReturn}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                )): 
                <Typography>
                    No Books Rented Yet.
                </Typography>}
                </Card>
                </Card>
        </React.Fragment>}
        </React.Fragment>
    );
}

export default Wallet;