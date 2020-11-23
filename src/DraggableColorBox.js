import React from "react";
import {SortableElement} from "react-sortable-hoc";
import {withStyles} from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import styles from "./styles/DraggableColorBoxStyles";



const DraggableColorBox = SortableElement (props => {
    const {classes, handleClick, name, color} = props;
    return (
    <div 
        className = {classes.root} 
        style={{backgroundColor: color}}
    >  
        <div className={classes.boxContent}>
            <span>{name}</span>
            <DeleteIcon 
            className={classes.deleteIcon}
            //when the user click the delet icon, handleClick will 
            //fire removeColor that is inside the component newPaletteform 
            onClick={handleClick}/> 
        </div>  
    </div>
    );
});

export default withStyles(styles)(DraggableColorBox);