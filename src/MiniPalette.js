import React, { Component } from "react";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from '@material-ui/icons/Delete';


class MiniPalette extends Component {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }
   
    //the method will accept an a event e 
    deletePalette(e){
        //we will not change the route after the click, because this will stop it stoppropagation
        /* The stopPropagation() method of the Event interface prevents further 
        propagation of the current event in the capturing and bubbling phases. */
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }
    render(){

    const {classes, paletteName, emoji, colors, handleClick }= this.props;
    const miniColorBoxes = colors.map(color => (
        <div 
            className={classes.miniColor}
                style={{ backgroundColor: color.color }}  
                key={color.name}
        />
    ));
    return(
        <div className={classes.root} onClick={handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    style={{transition: "all 0.3s ease-in-out"}}
                    onClick={this.deletePalette}   
                />
          <div className={classes.colors}>{miniColorBoxes}</div> 
          <h5 className={classes.title}>
            {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>              
        </div>
    );
    }
}

export default withStyles(styles) (MiniPalette);