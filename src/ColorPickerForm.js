import React, { Component } from 'react'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from "./PaletteFormNav";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ChromePicker} from "react-color";  
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {arrayMove} from "react-sortable-hoc";
import styles from "./styles/ColorPickerFormStyles";



class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state ={currentColor: "teal" ,newColorName: ""};
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 


    };


    //we add validations rules here
    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
            //every singel thing in the state.color
            //the value er whatever it is in that input, what the user types inside
            //we will check the input value, against all colors in ouer current state
            //we excract name from each color
            //make sure we dont have a name, that is equal to the input value from the user
            this.props.colors.every(
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
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor) 
        );
        
    }

      //updated the color on the "legg til farge knapp"
      updateCurrentColor(newColor){
        this.setState({currentColor: newColor.hex })
    }

    //for the form
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(){
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        //we pass this through to
        this.props.addNewColor(newColor);
        //empty the newcolorname
        this.setState({n : ""});
    }
    render() {
        const {paletteIsFull, classes} = this.props;
        const {currentColor, newColorName} = this.state;
        return (
            <div>
                <ChromePicker 
                color={this.state.currentColor}
                onChangeComplete={this.updateCurrentColor}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={this.handleSubmit} ref="form">
                <TextValidator 
                value={newColorName}
                variant="filled"
                margin="normal" 
                className={classes.colorNameInput}
                placeholder="Navn på farge"
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
                    disabled={paletteIsFull}
                    className={classes.addColor}
                    style= {{backgroundColor: paletteIsFull ? "grey" : currentColor}}
                >
                    {paletteIsFull ? "Paletten er full": "Legg til farge"}
                    
                </Button>
            </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);
