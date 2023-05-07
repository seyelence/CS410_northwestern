import React, {useContext} from "react";
import { ItemContext } from "./ItemContext";
import CritiqueBox from "./CritiqueBox";
export default function ItemsToHTML(itemList=[]){
    const {currentItem, setItem, setPageNumber, setRectangles, setAccessCanvas, setIndex} = useContext(ItemContext);

    function CommentResults(item=[]){
      return(
        <div id="buttonGen">
          {ButtonGen(0,item)}
          {ButtonGen(1,item)}
          {ButtonGen(2,item)}
          {ButtonGen(3,item)}
          {ButtonGen(4,item)}
        </div>
      )
    }

    function RemoveComment(item, num){
      const confirmed = window.confirm('Are you sure you want to delete comment?');
      if(confirmed){
        item.setComment("", num);
        /* force re-render by setting Item to something*/
        if(currentItem === null){
          setItem([]);
        } else {
          setItem(null);
        }
      }
    }

    function drawRectangle(arr = []){
      setAccessCanvas(true);
      setRectangles(arr[1]);
      setPageNumber(arr[0]);
    }

    function clearCanvas(){
      console.log("tried to clear")
      setRectangles([]);
      setAccessCanvas(false);
    }

    function ButtonGen(num=0, item=[]){
      return(
        <div style={{
          'visibility':`${item.Comment[num] === '' ?  'hidden':'visible'}`,
          'display':`${item.Comment[num] === '' ?  'none':'block'}`,
          margin:"-10px",
        }} 
        onMouseEnter={() => {drawRectangle(item.LocationRt[num])}} 
        onMouseLeave={() => {clearCanvas()}} 
        className="tooltip">
          <span className="tooltiptext">{item.Comment[num]}</span>
          <button className="commentRt" onClick={()=>{RemoveComment(item,num)}} >{num+1}</button>
        </div>
      )
    }
    
    function AddCommentHandler(item=null){
      item === currentItem ? setItem(null) : setItem(item);
      setIndex(-1);
    }

    return (
        itemList.map((item, i) =>
        <ul>
          <li>
          <div className= "alignRatingContainer">
            <div className="tooltip">
              {/* <span className="tooltiptext">{item.mouseOver}</span> */}
              <button className="plus" onClick={() => {AddCommentHandler(item)}}>{item === currentItem ? '-' : '+'}</button>
              {item.Display}
            </div>
            {item === currentItem ? <CritiqueBox/> : null}
           </div>
          {CommentResults(item)}
        </li>
        </ul>)
      )
}



