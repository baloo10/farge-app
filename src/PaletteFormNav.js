import React, { Component } from 'react'
import {Link} from "react-router-dom"
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import PaletteMetaForm from "./PaletteMetaForm"
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from "@material-ui/core/Button"
//import DraggableColorList from "./DraggableColorList"
import styles from "./styles/PaletteFormNavStyles";




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
        const {classes, open, palettes, handleSubmit, handleDrawerOpen} = this.props;
        const {formShowing} = this.state;
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
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <AddToPhotosIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Lag en ny palett
              </Typography>
            </Toolbar>
            <div className={classes.navBtns}> 
                  
                  <Link to="/">
                        <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}>
                          Tilbake
                        </Button>
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
                  {formShowing && (
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
