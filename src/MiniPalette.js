import React from "react";
import {withStyles} from "@material-ui/styles";

const styles ={
    main: {
        background: "purple",
        border: "3px solid teal"
    }
};

function MiniPalette (props){
    const {classes} = props;
    return(
        <div className={classes.main}>
        <h1>Mini palette</h1>
    </div>
    );
}

export default withStyles(styles) (MiniPalette);