import React, {useContext, useState, useEffect} from 'react';
import { ItemContext } from './ItemContext';
import Item from './Item';


export default function CritiqueBox(){
    const [comment, setComment] = useState("");
    let {currentItem: item1, setAccessCanvas: setCanvas1, index: index1, setIndex: setIndex1, rectangles, pageNumber, locked} = useContext(ItemContext);
    let {totalItems, setItem, currentItem: item2, index: index2, accessCanvas: canvas2} = useContext(ItemContext);
    const {setPageNumber, setRectangles} = useContext(ItemContext);

    useEffect(() => {
        if (item2 && Array.isArray(item2.Comment) && index2 !== -1) {
          setComment(item2.Comment[index2]);
        }
      }, [index2, item2]);
    
    function RemoveComment(){
        if(index1 === -1){
            setItem(null);
        } else if(locked){
            alert("Please unlock item before deleting");
        }
            else {
            const confirmed = window.confirm('Are you sure you want to delete comment?');
            if(confirmed){
            item1.setComment("", index1);
            setItem(null);
            }
        }
      }

    function drawRectangle(arr = []){
          setCanvas1(true);
          setRectangles(arr[1]);
          setPageNumber(arr[0]);
    }
  
    function clearCanvas(){
          setRectangles([]);
          setCanvas1(false);
    }

    const handleCommentChange = event => {
        setComment(event.target.value)
      }
      
    function saveReturn(savedComment) {
        item1.LocationRt[index1]=[]
        if(index1 != -1){
            item1.LocationRt[index1].push(pageNumber);
            item1.LocationRt[index1].push(rectangles);
            setCanvas1(false);
            if (index2 !== -1){
                item2.setComment(savedComment, index2);
            }
            totalItems.push(item2);
        }
        setItem([...totalItems.slice(0, index2), item2, ...totalItems.slice(index2 + 1)]);
    }

    function IndexClick(num = -1){
        console.log(num);
        clearCanvas();
        setIndex1(num);
        setComment(item1.Comment[num]);
        if(item1.LocationRt[num].length != 0){
            console.log(num, item1.LocationRt[num],item1.LocationRt);
            drawRectangle(item1.LocationRt[num]);
        }
    }

    if (item1 instanceof Item) {
        return (
            <div className='critiqueBoxContainer' >
                <div className="critiqueBox">
                    <div style={{margin: '0', width: '20vw'}}>
                        <h4> Rating: </h4>
                        <div style={{display: 'flex'}}>
                            <button  id="one" onClick={() => {IndexClick(0)}}>1</button>
                            <button  id="two" onClick={() => {IndexClick(1)}}>2</button>
                            <button  id="three" onClick={() => {IndexClick(2)}}>3</button>
                            <button  id="four" onClick={() => {IndexClick(3)}}>4</button>
                            <button  id="five" onClick={() => {IndexClick(4)}}>5</button>
                            <button style={{visibility: `${index1 === -1 ? 'hidden' : 'visible'}`, margin: '-3px 10px'}} className="generalButton" onClick={() => {setCanvas1(true)}}>Location</button>
                        </div>
                    </div>
                    <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange} style={{margin: '10px 0'}}/>
                    <span style={{ float: 'right', margin: '0px -5px 5px 0' }}>
                    <button className="generalButton" onClick={() => { RemoveComment() }}>Delete</button>
                        <button className="generalButton" onClick={() => { saveReturn(comment) }}>Submit</button>
                    </span>
                    <br/>
                </div>
            </div>

        )
    } else {
    return (
        <div className="critiqueBox" >
        </div>
    )}
}