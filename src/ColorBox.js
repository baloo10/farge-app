import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import "./ColorBox.css";
import {Link} from "react-router-dom"

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    //when we click copytoclipboard, then this method will be called, then it will set copies to 
    //be true, and then 1500s later, it sets it back to be false
    changeCopyState(){
        this.setState({copied: true}, () =>{
            setTimeout(()=> this.setState({copied: false}), 1500);
        });
    }
    render() {
        //stop.Propagationn will stopp all code/events that that will be called after this// 
        const {name, background, paletteID, id} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}> 
                <div style={{ background  }} className="ColorBox">
                    <div 
                    style={{background}}
                    //if copies is true, then we add the class show
                     className={`copy-overlay ${copied && "show"}`}   
                     />
                     <div className={`copy-msg ${copied && "show"}`}>
                         <h1>Kopiert</h1>
                         <p>{this.props.background}</p>
                     </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Kopier</button>
                    </div>
                    
                    <Link to={`/palette/${paletteID}/${id}`} onClick={e => e.stopPropagation()}> 
                    <span className="see-more">Mer</span>
                    </Link>
                </div>
           </CopyToClipboard>

        );
    }
}

export default ColorBox;
