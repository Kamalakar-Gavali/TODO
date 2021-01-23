import React, {useEffect, useState} from 'react'
import List from './components/List';
const APP=()=>{

const [item,setItem]=useState('');
const [itemList,setItemList]=useState([]);
const [inputBorder,setInputBorder]=useState('2px solid black');

const addItem=(e)=>{
    e.preventDefault();
    if(item.trim()!=='')
    {
        setInputBorder('2px solid black');
        fetch("/addItem",{
            method:'POST',
            body:JSON.stringify({task:item}),
            headers:{"Content-Type":"application/json"}
        }).then(r=>r.json()).then(res=>{const tempArr=[...itemList];tempArr.push(res);console.log(res);setItemList([...tempArr]);setItem('')});
    }
    else{
        setInputBorder('2px solid red');
    }
}
const editItem=(index,newVal)=>{
    const idToEdit=itemList[index]._id;
    fetch(`/editItem/${idToEdit}`,
        {
            method:"PUT",
            body:JSON.stringify({task:newVal}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{const data=[...itemList];
            data[index].task=newVal;
            setItemList(data)})

}
const deleteItem=(index)=>{
    
    const data= [...itemList];
    const idTodDelete=data[index]._id;

    fetch(`/deleteItem/${idTodDelete}`,{
    method:"DELETE"}).then(res=>{data.splice(index,1);setItemList([...data])})

}

useEffect(()=>{

    fetch('/getItems',{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            'Accept': 'application/json'
        }
    }).then(data=>data.json()).then((arr)=> {const sortedArr = arr.sort((a, b) => {
        const aDateNumeric = new Date(a.creationTime).valueOf();
        const bDateNumeric = new Date(b.creationTime).valueOf();
        return aDateNumeric - bDateNumeric;
    })
    setItemList(sortedArr);
});//data.map((element)=>(element.task))).then((task)=>setItemList(task)//const x=[...itemList];x.push(data.text);setItemList(x)})
   
},[])
    return(
        <div className="App">
            <main><h1>ToDo List</h1>
        <form onSubmit={addItem}>
        <input placeholder="Add task here" value={item} onChange={(e)=>setItem(e.target.value)} style={{border:inputBorder}} onBlur={()=>setInputBorder('2px solid black')}/>
        <button style={{marginBottom: '20px'}}>Add</button>
        
        {
            itemList.map((item,index)=>
          <List itemList={itemList} item={item} index={index} editItem={editItem} deleteItem={deleteItem}/>
        )}
        

        </form>
        </main>
        <footer>© 2020 Developed by KG</footer>
        </div>
        
    

    )
}
export default APP;