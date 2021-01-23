import React,{useState} from 'react';
const List=(props)=>{
    const [showEdit,setShowEdit]=useState(false);
    const [editedItem,setEditedItem]=useState('');
   
    return(
        <>
                <div key={props.index} className='list-items'>
                
                {props.item.task}
                {showEdit?
                <span>
                <input value={editedItem} onChange={(e)=>setEditedItem(e.target.value)}/>
                <button onClick={()=>{props.editItem(props.index,editedItem);setShowEdit(!showEdit)}}>Save</button>
                <button onClick={()=>setShowEdit(!showEdit)}>Cancel</button>
                       
                </span>
                
                :
                <span>
                <button onClick={()=>{setShowEdit(!showEdit);setEditedItem(props.item.task)}}>Edit</button>
                <button onClick={()=>props.deleteItem(props.index)}>Delete</button>
                </span>
                 }
                </div>
                  
        </>
    )
}
export default List;