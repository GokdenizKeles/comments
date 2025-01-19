import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  
  const dialogRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);

 function showDialog(i) {
   dialogRef.current.showModal()
   setCurrentComment(i);
 
 }
  
  function handleIncreaseLike(i) {
    const foundItem = comments[i].likes+1;
    const updateLike = [...comments];
    updateLike[i].likes = foundItem;
    setComments(updateLike)
  }

  function handleIncreaseDislike(i) {
    const foundItem = comments[i].dislikes+1;
    const updateDislike = [...comments];
    updateDislike[i].dislikes = foundItem;
    setComments(updateDislike)
  }

  useEffect(() => {
    async function getData() {
      const data = await fetch('./data.json').then(res => res.json());
      setComments(data);
    }
    getData()
  },[])

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    console.log(formObj.message);


    const newComment = {
      name:"mako",
      time: new Date().toLocaleDateString("tr-TR", { hour: "numeric", minute: "numeric", second: "numeric", year: "numeric", month: "long", day: "numeric" }),
      comment: formObj.message,
      likes: 0,
      dislikes: 0,
      replies: [],
    }
    setComments([...comments,newComment])
  }

  function handleReplySubmit(e) {
  e.preventDefault()
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const updateComment = [...comments];
    e.target.reset();
    dialogRef.current.close();

    const newReply = {
      name:"mako",
      time: new Date().toLocaleDateString("tr-TR", { hour: "numeric", minute: "numeric", second: "numeric", year: "numeric", month: "long", day: "numeric" }),
      comment: formObj.message,
      likes: 0,
      dislikes: 0,
    }
   
    
    updateComment[currentComment].replies.push(newReply);
    setComments(updateComment)
    console.log(updateComment[currentComment].replies);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <textarea name="message" required rows={3} placeholder='Add comment...'></textarea>
        <div>
          <div className='text-edits'>
            <button type='button'><i className="fa-solid fa-b" /></button>
            <button type='button'><i className="fa-solid fa-italic" /></button>
            <button type='button'><i className="fa-solid fa-underline" /></button>
          </div>
          <div className='social-edits'>
            <button type='button'><i className="fa-solid fa-paperclip" /></button>
            <button type='button'><i className="fa-solid fa-image" /></button>
            <button type='button'><i className="fa-solid fa-face-smile" /></button>
          </div>
        </div>
        <button className='submit-btn'>Submit</button>
      </form>
      <div className="comments-header">
        <h3>Comments</h3>
        <div>
          <select>
            <option>Most recent</option>
          </select>
        </div>
      </div>
      <ul className='comments'>
        {comments.map((x, i) =>
           <li className='comment' key={i}>
            <div className="user-comment-info">
              <p><strong>{x.name}</strong></p>
              <span>{x.time}</span>
            </div>
            <p>{x.comment}</p>
            <div className='user-comment-btns'>
              <button className="fa-solid fa-thumbs-up" onClick={() => handleIncreaseLike(i)}>{x.likes}</button>
              <button className="fa-solid fa-thumbs-down" onClick={() => handleIncreaseDislike(i)}>{x.dislikes}</button>
              <button onClick={() => showDialog(i)}>Reply</button>
              <dialog ref={dialogRef}>
              <form onSubmit={handleReplySubmit}>
                <textarea  name="message" required rows={3} placeholder='Add comment...'></textarea>
                <div>
                  <div className='text-edits'>
                    <button type='button'><i className="fa-solid fa-b" /></button>
                    <button type='button'><i className="fa-solid fa-italic" /></button>
                    <button type='button'><i className="fa-solid fa-underline" /></button>
                  </div>
                  <div className='social-edits'>
                    <button type='button'><i className="fa-solid fa-paperclip" /></button>
                    <button type='button'><i className="fa-solid fa-image" /></button>
                    <button type='button'><i className="fa-solid fa-face-smile" /></button>
                  </div>
                </div>
                <button className='submit-btn'>Submit</button>
              </form>
              </dialog>
              <div className='replies-area'>
                
              </div>
            </div>
            {x.replies.length > 0 &&
            <ul>
              {x.replies.map(y => 
                     <li>
                     <div className="user-comment-info">
                       <p><strong>{y.name}</strong></p>
                       <span>{y.time}</span>
                     </div>
                     <p>{y.comment}</p>
                     <div className='user-comment-btns'>
                       <button onClick={() => handleBtn(i)}><i className="fa-solid fa-thumbs-up" />{y.likes}</button>
                       <button><i className="fa-solid fa-thumbs-down" />{y.dislikes}</button>
                       <button onClick={() => showDialog(i)}><i className="fa-solid fa-comment-dots" />Reply</button>
                     </div>
                   </li>
              )}
            </ul>}
           </li>
           )}
      </ul>
    </div>
  )
}

export default App
