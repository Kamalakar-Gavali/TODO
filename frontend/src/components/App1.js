import React, { useState } from "react";
import "./../styles/App.css";
import EditandSaveTask from './EditandSaveTask'
function App(props) 
{
  const [newElement,setNewElement]=useState(0);
  const [text,setText]=useState("");
  const [editedText,setEditedText]=useState([]);
  const [taskList,setTaskList]=useState([]);
  const [editandSave,setEditandSave]=useState([{}]);
  var taskText="";

     const inputText=((event)=>{
	 console.log(event.target.value) ;
	 
	 setText(event.target.value);
	 //event.target.id!=undefined?setEditedText(event.target.value):setText(event.target.value);
	})
	const inputText1=((event)=>{

		console.log(event.target.value) ;
		let editedTextArr=editedText;
		editedTextArr[event.target.parentElement.id]=event.target.value;
        setEditedText([...editedText]);	
		//setTaskList[event.target.parentElement.id]=event.target.value;
	   })
	
	const addToList=(event)=>{

		 if(text!='')
		 {
		 setTaskList([...taskList,text])
		 setEditandSave([...editandSave,{show:false}])
		 setEditedText([...editedText,""]);
		 }
		 setText('');

	}
	const deleteFromList=((e)=>{
		console.log(e.target.parentElement.id);
		console.log([...taskList].splice(e.target.parentElement.id,1))
		let arr=taskList;
		arr.splice(e.target.parentElement.id,1);
		setTaskList([...taskList]);
		let editAndSaveArr=editandSave;
		editAndSaveArr[e.target.parentElement.id].show=false;
		setEditandSave([...editandSave]);
	})
	const showEditInputboxandSave=((e)=>{
		let editAndSaveArr=editandSave;
		let taskListArr=taskList;
		editAndSaveArr[e.target.parentElement.id].show=!editAndSaveArr[e.target.parentElement.id].show;
		setEditandSave([...editandSave]);
		let editedTextArr=editedText;
		editedTextArr[e.target.parentElement.id]=taskListArr[e.target.parentElement.id];
		setEditedText([...editedText]);
		    
			
		
		
	})
	const saveEditedText=((e)=>{

		let arr=editandSave;
		// && e.target.value!='' && e.target.parentElement.id!=undefined
		if(arr[e.target.parentElement.id].show && editedText!="")
		{
			let arr=taskList;
			arr[e.target.parentElement.id]=editedText[e.target.parentElement.id];
			setTaskList([...taskList]);
			showEditInputboxandSave(e);
			//setEditedText('');
		}
		

	})
  
	return (
	<div id="main">
	
	<textarea id="task" onChange={inputText} value={text}></textarea>

    <button type="button" id="btn" onClick={addToList}>Add 	Task</button>
	<ul>
		{
			taskList.map((value,index)=><li className="list" key={index} id={index}>
				{value} 
			<button className="edit" onClick={showEditInputboxandSave}>Edit</button>
			{editandSave[index].show?<EditandSaveTask index={index} inputText1={inputText1} showEditInputboxandSave={showEditInputboxandSave} editedText={editedText} saveEditedText={saveEditedText} editedText={editedText[index]} editTextVal={taskList[index]}/>:null}
			<button className="delete" onClick={deleteFromList}>Delete</button></li>)
		}
	
	</ul>
	</div>
	);
}


export default App;
