import React, { Component } from 'react'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ChromePicker} from "react-color";
//import { Button } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import DraggableColorBox from "./DraggableColorBox";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});



class NewPaletteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            currentColor: "teal",
            newColorName: "",
            colors: [{color: "blue", name: "blue"}],
            newPaletteName: ""
        };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.newPaletteName = this.newPaletteName.bind(this);
    }
    
    //we add validations rules here
    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
            //every singel thing in the state.color
            //the value er whatever it is in that input, what the user types inside
            //we will check the input value, against all colors in ouer current state
            //we excract name from each color
            //make sure we dont have a name, that is equal to the input value from the user
            this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            ) 
        );
                //one more validation
        ValidatorForm.addValidationRule("isColorUnique", (value) =>
            //every singel thing in the state.color
            //the value er whatever it is in that input, what the user types inside
            //we will check the input value, against all colors in ouer current state
            //we excract name from each color
            //make sure we dont have a name, that is equal to the input value from the user
            this.state.colors.every(
                ({ color }) => color !== this.state.currentColor) 
        );
        ValidatorForm.addValidationRule("isPalettNameUnique", (value) =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }
  
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };

    //updated the color on the "legg til farge knapp"
    updateCurrentColor(newColor){
        this.setState({currentColor: newColor.hex })
    }

    //we setstate, and updates the colors array, we include a new color
    //colors array will be sett to current array + current color in the state
    addNewColor(){ 
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.setState({colors: [...this.state.colors, newColor],  newColorName: ""})
    };

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    //we pass this to the app.js componennt
    handleSubmit(){
        let newName = this.state.newPaletteName
        const newPalette = {
            paletteName: newName, 
            //we replace "space" with a "-"
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors: this.state.colors
        };
            this.props.savePalette(newPalette);
            //we pass routeProps from app.js, so we can use the .history here
            this.props.history.push("/");
        }
  
    render() { 
      const { classes, theme } = this.props;
      const { open } = this.state;  
  
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
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Persistent drawer
              </Typography>
              <ValidatorForm onSubmit={this.handleSubmit }> 
                <TextValidator 
                    label="Palett navn" 
                    value ={this.state.newPaletteName}
                    name="newPaletteName"
                    onChange={this.handleChange}
                    validators={["required", "isPalettNameUnique"]}
                    errorMessages={["*Tast inn palett navn", "Navn allerede tatt"]}
                    />
                    <Button 
                        variant="contained" 
                        color="secondary"
                        type="submit"
                        >
                            Lagre fargepalett
                    </Button>
                </ValidatorForm>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <Typography variant="h4">
                Lag din farge Palette
            </Typography>
            <div>
            <Button variant="contained" color="secondary" > Start på nytt </Button>
            <Button variant="contained" color="primary" > Tilfeldig farge </Button>
            </div>
            <ChromePicker 
                color={this.state.currentColor}
                onChangeComplete={this.updateCurrentColor}
            />
            <ValidatorForm onSubmit={this.addNewColor} ref="form">
                <TextValidator 
                value={this.state.newColorName} 
                name="newColorName"
                onChange={this.handleChange}
                validators={["required","isColorNameUnique", "isColorUnique"]}
                errorMessages={[
                    "Skriv navn på farge",
                    "Fargenavnet må være unik",
                    "Fargen er allerede i bruk!"
                    ]}
                />


                <Button 
                    variant="contained" 
                    type="submit "
                    color="primary" 
                    style= {{backgroundColor: this.state.currentColor}}
                >
                    Legg til farge
                </Button>
            </ValidatorForm>  
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            
                {this.state.colors.map(color => (
                    <DraggableColorBox color={color.color} name={color.name} /> 
                        
                ))}
            
            
          </main>
        </div>
      );
    }
  }
  

  export default withStyles(styles, {withTheme: true})(NewPaletteForm);

