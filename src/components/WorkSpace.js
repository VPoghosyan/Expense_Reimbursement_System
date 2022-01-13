import React, { useState } from 'react'
import Card from './Card'



const WorkSpace = (props) => {
    return (
        <Card scale='scale(2)' height='300px'>{props.children}</Card>
    );
}

export default WorkSpace;