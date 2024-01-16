import {BASE_URL} from "../../../config.ts";

async function addUserFromToOtherNote (username:string, index:number | null,can_edit:boolean, jwt:any) {
    const url = `${BASE_URL}/sharing/`
    // const owner = localStorage.getItem("user_id")
    const data = {user:username, note:index, can_edit:can_edit}
    console.log(data)
    try{
        const response = await jwt.post(url, data)
        console.log(response)
     if (response.status === 201) {
      console.log('User successgully add:', response.data);
    } else {
      console.error('Error to add user:', response.statusText);
    }
    return true
  } catch (error) {
    console.error('Error to add user while send request:', error);
    return false
  }
}

export default addUserFromToOtherNote