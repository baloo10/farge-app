import React, { Component } from 'react'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import {arrayMove} from "react-sortable-hoc";
import styles from "./styles/NewPaletteFormStyles";






class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props){
        super(props);
        this.state = {
            open: true,
            colors: this.props.palettes[0].colors
            
        };
        this.addNewColor = this.addNewColor.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
        //this.newPaletteName = this.newPaletteName.bind(this);
    }
    
    
  
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };

    //we setstate, and updates the colors array, we include a new color
    //colors array will be sett to current array + current color in the state
    addNewColor(newColor){ 
        
        this.setState({colors: [...this.state.colors, newColor],  newColorName: ""})
    };

    //for the form
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    //delet all colors, sett colors to a empty array
    clearColors(){
        this.setState({colors: []});
    }

    addRandomColor(){
        //pick random color from existing palettes
        //.flat will make the nested array into one array
        const allColors = this.props.palettes.map( p=> p.colors).flat();
        //give us a random number
        var rand = Math.floor(Math.random() * allColors.length);
        //get a random color, with the random numer rand
        const randomColor = allColors[rand];
        this.setState({colors: [...this.state.colors, randomColor]})
    }
    //we pass this to the app.js componennt
    handleSubmit(newPalette){
     
            //we replace "space" with a "-"
            newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
            newPalette.colors = this.state.colors; 
            //we take newPalette and save it here
            this.props.savePalette(newPalette);
            //we pass routeProps from app.js, so we can use the .history here
            this.props.history.push("/");
        }
    
    removeColor(colorName){
        this.setState({
            //we are filtring out where colorName is colorName
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }
    //got this from here: https://github.com/clauderic/react-sortable-hoc
    //makes it remember where the boxes are 
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
          colors: arrayMove(colors, oldIndex, newIndex),
        }));
      };


    render() { 
      const { classes, theme, maxColors, palettes } = this.props;
      const { open, colors } = this.state;
      //max color is 20, if colors is equal or bigger, then true 
      const paletteIsFull = colors.length >= maxColors;  
  
      return (
        <div className={classes.root}>
          <PaletteFormNav 
            open={open}  
            palettes ={palettes} 
            handleSubmit={this.handleSubmit}
            handleDrawerOpen = {this.handleDrawerOpen}
            />
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
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
                Lag din farge Palette
            </Typography>
            <div className={classes.buttons }>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={this.clearColors}
                className={classes.button}
                >
                 Slett alle farger
             </Button>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={this.addRandomColor}
                className={classes.button}
                disabled ={paletteIsFull}
                > 
                    Tilfeldige farger
            </Button>
            </div>
              <ColorPickerForm 
                paletteIsFull={paletteIsFull}
                addNewColor={this.addNewColor}
                colors={colors}
                 />
           </div>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <DraggableColorList 
                colors={this.state.colors} 
                removeColor={this.removeColor} 
                axis="xy"
                onSortEnd={this.onSortEnd}
                />
          </main>
        </div>
      );
    }
  }
  
  export default withStyles(styles, {withTheme: true})(NewPaletteForm);


