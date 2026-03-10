import { useState } from "react"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleSubmit = async (e)=>{
e.preventDefault()

const res = await fetch("http://localhost:8080/api/auth/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:name,
email:email,
password:password
})
})

const data = await res.json()

console.log(data)

alert("Register success")
}

return(

<div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>

<form onSubmit={handleSubmit}>

<h2>Register</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button>
Register
</button>

</form>

</div>

)

}

export default Register