import React, { Component } from 'react'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"
import {Picker} from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'



class PaletteMetaForm extends React.Component {
        constructor(props){
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount(){
        console.log("buddah" + this.props.palettes)
        ValidatorForm.addValidationRule("isPalettNameUnique", (value) =>
        
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
        const {palettes, handleSubmit, hideForm} = this.props;
        const {newPaletteName} = this.state;
      return (
        
          
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            onClose={hideForm} //when user click outside the form, the form will also close 
          >
            <DialogTitle id="form-dialog-title">Velg palett navn</DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName) }> 
            <DialogContent>
              <DialogContentText>
                 Skriv inn navnet på din nye palett. Pass på at navnet er unikt!
              </DialogContentText>

              <Picker />
                <TextValidator 
                    label="Palett navn" 
                    value ={newPaletteName}
                    name="newPaletteName"
                    onChange={this.handleChange}
                    fullWidth
                    margin="normal"
                    validators={["required", "isPalettNameUnique"]}
                    errorMessages={["*Tast inn palett navn", "Navn allerede tatt"]}
                    />
                     
                
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                type="submit"
                >
                Lagre fargepalett
            </Button>
            </DialogActions>
            </ValidatorForm>
          </Dialog>
        
      );
    }
  }

  export default PaletteMetaForm;