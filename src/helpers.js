const callAPI = async (endpoint,data=false) => {
    let params = {
        headers: {},
        method: "get",
        body: null
    }
    
    if(data){
        params.method = "post";
        params.headers = {'Content-Type': 'application/json'};
        params.body = JSON.stringify(data);
    }

    let responce = await fetch(`/api/v1/${endpoint}`,params);
    if(!data){
    let rcv = await responce.json();
    return rcv}
    return true;
}

module.exports = {
    callAPI
}