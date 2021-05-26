// import React, {useState, useEffect} from 'react';
// import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Paper from '@material-ui/core/Paper';
// import '../styles/searchbooks.css';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import BookCards from './BookCards';
// import { Redirect } from 'react-router-dom';
// import { pageActions } from '../store/index';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// const drawerWidth = 200;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
//   },
//   paper2: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//       padding: theme.spacing(1),
//       width: '950px',
//       marginTop: '100px',
//       left: '22%',
//       position: 'relative',
//       paddingTop: '40px',
//       height: '650px',
//       overflow: 'auto',
//       paddingLeft: '25px'
//     },
//   },
//   textfield: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '75ch',
//     },
//   },
//   button: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   appBar: {
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginRight: drawerWidth,
//   },
//   title: {
//     flexGrow: 1,
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-start',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginRight: 0,
//   },
// }));

export default function SearchBooks() {
  // const history = useHistory();

  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   redirectIt();
  // }, []);

  // const redirectIt = () => {
  //   return (
  //     <Redirect to = '/drawer/searchbooks' />
  //   );
  // }

  // const classes = useStyles();
  // const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  // const [searchedBook, setSearchedBook] = useState('');
  // const [typed, setTyped] = useState('');

  // const handleChangeSearchBox = (event) => {
  //   console.log(event.target.value);
  //   setTyped(event.target.value);
  // }

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   setSearchedBook(typed);
  // }

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <div></div>
  //   <div className={classes.root} style={{overflow: 'hidden'}}>
  //     <CssBaseline />
  //     <AppBar
  //       position="fixed"
  //       className={clsx(classes.appBar, {
  //         [classes.appBarShift]: open,
  //       })}
  //     >
  //       <Toolbar>
  //         <Typography variant="h6" noWrap className={classes.title}>
  //           Gaurav's Library - [ Library Management System ] 
  //         </Typography>
  //         <IconButton
  //           color="inherit"
  //           aria-label="open drawer"
  //           edge="end"
  //           onClick={handleDrawerOpen}
  //           className={clsx(open && classes.hide)}
  //         >
  //           <MenuIcon />
  //         </IconButton>
  //       </Toolbar>
  //     </AppBar>
  //     <main
  //       className={clsx(classes.content, {
  //         [classes.contentShift]: open,
  //       })}
  //     >
  //       <div className={classes.drawerHeader} />
  //       <div className="classes.paper center">
  //         <Paper elevation={3}>
  //           <div className={classes.textfield}>
  //             <TextField id="outlined-basic" label="Search Books" variant="outlined" onChange={handleChangeSearchBox} value={typed} />
  //             &emsp;
  //             <Button variant="contained" className={classes.button} style={{width: '20ch'}} onClick={handleSearchSubmit}>Search Book</Button>
  //           </div>
  //         </Paper>
  //       </div>
  //       <div className={classes.paper2}>
  //         <Paper elevation={6}>
  //         {/* <div style={{marginTop: '100px', position: 'relative', left: '22%', paddingTop: '40px'}}> */}
  //           <BookCards search={searchedBook} />
  //         {/* </div> */}
  //         </Paper>
  //       </div>
  //       <Typography paragraph>
          
  //       </Typography>
  //       <Typography paragraph>

  //       </Typography>
  //     </main>
  //     <Drawer
  //       className={classes.drawer}
  //       variant="persistent"
  //       anchor="right"
  //       open={open}
  //       classes={{
  //         paper: classes.drawerPaper,
  //       }}
  //     >
  //       <div className={classes.drawerHeader}>
  //         <IconButton onClick={handleDrawerClose}>
  //           {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  //         </IconButton>
  //       </div>
  //       <Divider />
  //       <List>
  //         {['Search Books', 'Show My Books'].map((text, index) => (
  //           <ListItem button key={text}>
  //             {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
  //             <ListItemText primary={text} />
  //           </ListItem>
  //         ))}
  //       </List>
  //       <Divider />
  //       <List>
  //         {['Show My Fine', 'Profile Page'].map((text, index) => (
  //           <ListItem button key={text}>
  //             {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
  //             <ListItemText primary={text} />
  //           </ListItem>
  //         ))}
  //       </List>
  //     </Drawer>
  //   </div>
  );
}