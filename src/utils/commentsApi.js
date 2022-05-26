import tokenService from "./tokenService"

const BASE_URL = '/api/comments/'

export function create(commentData){
    return fetch(BASE_URL , {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers:{ 'Authorization': 'Bearer ' + tokenService.getToken()
    }
        
    }).then(res => {
        if(res.ok)return res.json()
        throw new Error('Not Logged In! Check express terminal')
    }) 
}
export function getPostById(postId) {
    return fetch(`${BASE_URL}/${postId}`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
})
.then(res => {
    if(res.ok) return res.json();
    throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
})
}







// passing comments

//create function that gets comment id
// function getpostById(postId)
//B_U + postId
//headers