import React, { useState } from "react";
import App from './App'

const EditandSaveTask=(props)=>{
    console.log("in Editand Save"+props);
    const saveTasktoList=((e)=>{

    })
       
    return(
    <>
    <textarea className="editTask" onChange={props.inputText1} value={props.editedText} id=" "></textarea><button className="saveTask" onClick={props.saveEditedText}>Save Task</button>
    </>
    )
    
}
export default EditandSaveTask;