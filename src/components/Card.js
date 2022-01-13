import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  return (
    
      <div  className={classes.card} style={{height: props.height, width: props.width, transform: props.transl
      , padding: props.padding, paddingBottom:props.paddingBottom}}>
        {props.children}</div>
    
  );
};

export default Card;