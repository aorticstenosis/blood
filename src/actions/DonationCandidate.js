import api from "./api";


export const ACTION_TYPE ={
    CREATE:"CREATE",
    UPDATE:"UPDATE",
    DELETE:"DELETE",
    FETCH_ALL:"FETCH_ALL"
}

const formatData = data => ({
    ...data, 
    age: parseInt(data.age? data.age:0)
})

export const fetchAll = () => dispatch =>
    {
        api.donationCandidate().fetchAll()
        .then(
            response=>{
                console.log(response);
                dispatch({
                type:ACTION_TYPE.FETCH_ALL,
                payload:response.data
            })
            }
        )
        .catch(err => console.log(err))
        //get api 
        
    }

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data)
    api.donationCandidate().create(data)
    .then(res=>{
        //if(){}
        dispatch({
            type: ACTION_TYPE.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err =>console.log(err))
}
export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data)
    api.donationCandidate().update(id, data)
    .then(res=>{
        dispatch({
            type: ACTION_TYPE.UPDATE,
            payload: {id:id, ...data}
        })
        onSuccess()
    })
    .catch(err =>console.log(err))
}
export const deleteAction = (id, onSuccess) => dispatch => {
  
    api.donationCandidate().delete(id)
    .then(res=>{
        dispatch({
            type: ACTION_TYPE.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err =>console.log(err))
}