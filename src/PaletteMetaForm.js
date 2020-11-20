import React, { Component } from 'react'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"


class PaletteMetaForm extends React.Component {
        constructor(props){
        super(props);
        this.state = {
            open: false,
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
        const {palettes, handleSubmit} = this.props;
        const {newPaletteName} = this.state;
      return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Open form dialog
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </DialogContentText>
              <ValidatorForm onSubmit={() => handleSubmit(newPaletteName) }> 
                <TextValidator 
                    label="Palett navn" 
                    value ={newPaletteName}
                    name="newPaletteName"
                    onChange={this.handleChange}
                    validators={["required", "isPalettNameUnique"]}
                    errorMessages={["*Tast inn palett navn", "Navn allerede tatt"]}
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        >
                        Lagre fargepalett
                    </Button> 
                </ValidatorForm>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }

  export default PaletteMetaForm;