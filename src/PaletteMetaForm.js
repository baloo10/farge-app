import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
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
            //open: true,
            stage: "form",
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);

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

    //after first form it is submit, the stage is "form", after submit first form
    //it will submit to to this function, that will change the state to
    //emoji, and the first form will go away, and the emoji form will appear
    showEmojiPicker(){
        this.setState({stage: "emoji" })
    }

    //when you click an a emoji, then you save a palette
    savePalette(emoji){
        const newPalette = {
             paletteName: this.state.newPaletteName, 
             emoji: emoji.native 
            };
            this.props.handleSubmit(newPalette)
    }
  
    render() {
        const {palettes, handleSubmit, hideForm} = this.props;
        const {newPaletteName} = this.state;
      return (
          <div>
            
          <Dialog open={this.state.stage === "emoji"}>
          <DialogTitle id="form-dialog-title">Velg emoji til din palett</DialogTitle>
              <Picker title="Din emoji" onSelect={this.savePalette}/>
          </Dialog>
          <Dialog
            open={this.state.stage === "form"}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            onClose={hideForm} //when user click outside the form, the form will also close 
          >
            <DialogTitle id="form-dialog-title">Velg palett navn</DialogTitle>
            <ValidatorForm onSubmit= {this.showEmojiPicker} > 
            <DialogContent>
              <DialogContentText>
                 Skriv inn navnet på din nye palett. Pass på at navnet er unikt!
              </DialogContentText>

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
          </div> 
      );
    }
  }

  export default PaletteMetaForm;