import React, { Component } from 'react';
import {Link} from "react-router-dom";
 import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from "@material-ui/core/Avatar"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";
import { TransitionGroup, CSSTransition } from 'react-transition-group';



class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            openDialog: false,
            deletingId: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this. handleDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);

    }

    openDialog(id){
        this.setState({openDialog: true, deletingId: id})
    }

    closeDialog(){
         this.setState({openDialog: false, deletingId: ""})
    }
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }

    handleDelete(){
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }
    render() {
        const {palettes, classes } = this.props;
        const {openDialog} = this.state;
        //we send all props into MinPallet with {...palettes}}  

        return (
            <div className={ classes.root} >
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}> React colors</h1>
                        <Link to="/palette/new">Lag nye farger</Link>   
                    </nav>
                    
                        <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                        <CSSTransition 
                            key={palette.id} 
                            classNames="fade" 
                            timeout={500}
                            >
                            <MiniPalette {...palette} 
                            goToPalette={this.goToPalette}
                            openDialog={this.openDialog}
                            key={palette.id}
                            id={palette.id}
                            />
                        </CSSTransition>
                        ))}
                        </TransitionGroup>
                </div>
                <Dialog 
                    open={openDialog} 
                    aria-labelledby="delete-dialog-title" 
                    onClose={this.closeDialog}
                    >
                        <DialogTitle id="delete-dialog-title">Slette paletten?</DialogTitle> 
                        <List>
                            <ListItem button onClick={this.handleDelete}>
                                <ListItemAvatar>
                                    <Avatar
                                        style={{backgroundColor: blue[100], color: blue[600]}}
                                    >
                                        <CheckIcon>

                                        </CheckIcon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Slett"/>
                            </ListItem>
                            <ListItem button onClick={this.closeDialog}>
                                <ListItemAvatar>
                                    <Avatar
                                    style={{backgroundColor: red[100], color: red[600]}}
                                    >
                                        <CloseIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Avbryt"/>
                            </ListItem>
                        </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles) (PaletteList);
