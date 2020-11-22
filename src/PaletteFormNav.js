import React, { Component } from 'react'
import {Link} from "react-router-dom"
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import PaletteMetaForm from "./PaletteMetaForm"
//import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
//import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
//import ChevronRightIcon from '@material-ui/icons/ChevronRight'
//import {ChromePicker} from "react-color"
//import { Button } from '@material-ui/core'
import Button from "@material-ui/core/Button"
//import DraggableColorBox from "./DraggableColorBox";
import DraggableColorList from "./DraggableColorList"
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"
// import {arrayMove} from "react-sortable-hoc"

const drawerWidth = 400;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none"
    }
  },
  button: {
    margin: "0 0.5rem",
    "& a": {
      textDecoration: "none"
    }
  },
  link:{
    textDecoration: "none"
  }
}); 

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state = { newPaletteName: "", formShowing: false };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
  
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    
    //when user press button, this fuction will fire, and will set the state to the form into true
    //and then the form willl show
     showForm(){
      this.setState({formShowing: true});
    }

     hideForm(){
      this.setState({formShowing: false});
    } 
    render() {
        const {classes, open, palettes, handleSubmit} = this.props;
        const {newPaletteName} = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
          <AppBar
            position="fixed"
            color="default"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.props.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Lag en ny palett
              </Typography>
            </Toolbar>
            <div className={classes.navBtns}> 
                  
                  <Link to="/">
                        <Button variant="contained" color="secondary" className={classes.button}>Tilbake</Button>
                    </Link>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={this.showForm}
                        className={classes.button}
                        >
                        Lagre
                    </Button>
                </div>
          </AppBar>
                  {this.state.formShowing && (
                    <PaletteMetaForm 
                      palettes={palettes}
                      handleSubmit={handleSubmit}
                      hideForm = {this.hideForm} 
                    />
                  )}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);
