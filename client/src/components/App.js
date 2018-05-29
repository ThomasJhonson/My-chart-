import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from '../utils/tileData';

import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import {closeDrawer, openDrawer, login} from '../actions';

import Home from './Home';
import Login from './Login'
import Register from './Register/Register';
import Header from'./Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'static',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: '100px'
  },
});

class App extends React.Component {
  notify = () => toast("Wow so easy !");

  render() {
    const { classes, theme } = this.props;

    return (
      <BrowserRouter>
      <div className={classNames(classes.root)}>
        <Header></Header>
        <ToastContainer />
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.props.ui.open && classes.drawerPaperClose, 'myDrawer'),
          }}
          open={this.props.ui.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={()=> this.props.closeDrawer()}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>
          <main className={classes.content}>
            <Route path="/" component={Home} exact></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/register" component={Register} exact></Route>
        </main>
      </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({auth, ui}){
  return{ auth, ui };
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

App = connect( mapStateToProps, {closeDrawer,openDrawer,login} )(App);
export default   withStyles(styles, { withTheme: true })(App);

