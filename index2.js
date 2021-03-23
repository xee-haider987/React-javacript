

const DELETE_TASK = "DELETE_TASK"
const TOGGLE_TASK = "TOGGLE_TASK"
const CREATE_TASK = "CREATE TASK"
const DELETE_MOVIE = "delete movie"
const TOGGLE_MOVIE ="toggle movie"
const ADD_MOVIE ="add movie"

state = {
    task:[{id:0,name:'Will go for walk',done:false}],
    movie:[{id:0,name:'Mr. bean',done:false}]
}
function root_reducer(state = [],action)
{

    return {
         task:task_reducer(state.tasks,action),
        movie:movie_reducer(state.movies,action)
    }
}

function task_reducer(state=[],action) {
    console.log(action)
    switch(action.type){
        case DELETE_TASK :
            return state.filter((s)=>s.id !== action.id)
        case TOGGLE_TASK : 
            return state.map(
                (r)=>(r.id === action.id) ? Object.assign({},r,{done:r.done})
                : r ) 
        case CREATE_TASK:
            return state.concat([action.task]) 
        default:
            return state    
    }
    
}
function movie_reducer(state=[],action) {
    switch(action.type){
        case DELETE_MOVIE :
            return state.filter((s)=>s.id !== action.id)
        case TOGGLE_MOVIE : 
            return state.map(
                (r)=>(r.id === action.id) ? Object.assign({},r,{done:r.done})
                : r ) 
        case ADD_MOVIE:
            return state.concat([action.movie]) 
        default:
            return state    
    }
    
}
 
function createStore(root_reducer) {
   
    let state 
    let listenersArray = []
    const subscribe = (listener)=>{
        listenersArray.push(listener)
        return ()=>{
           listenersArray=() => listenersArray.filter((l)=>l !== listener)
        }
    }
    const dispatch =(action) =>
    {
        state = root_reducer(state,action)
        listenersArray.forEach(rec=>{
            console.log(action)
            rec(
                {  
                    task_name:action.task === undefined ? "":action.task.name,
                    movie_name:action.movie === undefined ? "":action.movie.name
                }
            )
        })
    }
    const getState = () => state
    return {
        getState,
        subscribe,
        dispatch

    }
   
} 
const store = createStore(root_reducer)

unsubscribe =store.subscribe(
    ()=>console.log("Change in state is happening now: ",store.getState)
)

// unsubscribe()

store.subscribe(
    (newtext)=>addTaskToDOM(newtext) 
)
store.subscribe(
    (newtext)=>addmoviesToDOM(newtext)
)

store.subscribe(
        ()=>console.log("Listeners complete for checking purpose",store.getState)
)
function generateId(){
    return Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36); 
}
function addTaskToDOM(newtext) {
    const {task} = store.getState() 
    if (task !== undefined) {
        task.forEach((r)=>{
            const ol = document.getElementById('task_list')
            const li = document.createElement('li') 
            const text_text = document.createTextNode(newtext.task_name) 
            li.appendChild(text_text)
            ol.appendChild(li)
        })
    }
}
function addmoviesToDOM(newMovie) {
    const {movie} = store.getState() 
    if (movie !== undefined) {
        movie.forEach((r)=>{
            const ol = document.getElementById('movie_list')
            const li = document.createElement('li') 
            const text_text = document.createTextNode(newMovie.movie_name) 
            li.appendChild(text_text)
            ol.appendChild(li)
        })  
    } 
}
function delete_task_action_creator(ids) {
    return{
        type:DELETE_TASK ,
     id:ids
    }
}
function toggle_task_action_creator(ids) {
    return{
        type:TOGGLE_TASK,
        id:ids
    }
    
}
function add_movie_action_creator(newtask){
   return{
    type:ADD_MOVIE,
    movie:{
        id:generateId(),
        name:newtask,
        done:false
    }
   }
}
function toggle_movie_action_creator(ids){
    return{
     type:TOGGLE_MOVIE,
    id:ids
    }
 }
 function delete_movie_action_creator(ids){
    return{
     type:DELETE_MOVIE,
     id:ids
    }
 }

function create_task_action_creator(newtask) {
    return{
        type:CREATE_TASK,
    task:{
        id:generateId(),
        name:newtask,
        done:false
    }
    }
    
}
// const delete_task_action={
//     type:DELETE_TASK,
//     id=0
// }
// const create_task_action={
//     type:CREATE_TASK,
//     task:{
//         id=0,
//         name:'will go for walk ',
//         done:false
//     }
// }
// const toggle_task_action={
//     type:TOGGLE_TASK,
//     id:0
// }

// const delete_movie_action={
//     type:DELETE_MOVIE,
//     id:0
// }
// const toggle_movie_action ={
//     type:TOGGLE_MOVIE,
//     id:0
// }
// const add_movie_action = {
//     type:ADD_MOVIE,
//     movie:{
//         id:0,
//         name:"Mr bean movie",
//         done :false
//     }
// }


// store.dispatch(create_task_action_creator)
// store.dispatch(toggle_task_action)
// store.dispatch(delete_task_action)
// store.dispatch(add_movie_action)



function add_task() {
    const newtask= document.getElementById('task_txt').value
    store.dispatch(create_task_action_creator(newtask))
}



function add_movie() {
    const newmovie= document.getElementById('movie_txt').value
    store.dispatch(add_movie_action_creator(newmovie))
}