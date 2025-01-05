// import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";

export function getToken(){
const token = Cookies.get("token");
return token??false;
}

export async function logout(){
const token1 = Cookies.get("token");
if(token1){
    Cookies.remove("token");
}
}
