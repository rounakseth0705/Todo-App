import personIcon from "../assets/person.svg";
import emailIcon from "../assets/email.svg";
import passwordIcon from "../assets/password.svg";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState("sign-up");
    const { login } = useContext(UserContext);
    const handleState = () => {
        if (state === "sign-up") {
            setState("login");
            return;
        } else {
            setState("sign-up");
        }
    }
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (state === "sign-up") {
                await login(state, { name, email, password });
            } else {
                await login(state, { email, password });
            }
            navigate("/task-list");
        } catch(error) {
            toast.error(error.message);
        }
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold m-5 text-red-500">Welcome to my App</h1>
            <h1 className="text-2xl font-semibold">{state === "sign-up" ? "Sign up" : "Login"}</h1>
            <form className="flex flex-col justify-center items-center m-5 p-8 bg-gray-200 rounded-lg">
                {state === "sign-up" &&
                    <div className="flex justify-center items-center m-5">
                        <img src={personIcon} alt="" className="size-20"/>
                        <input onChange={(event) => setName(event.target.value)} value={name} type="text" placeholder="enter your name" className="w-100 h-10 mx-5 px-5 outline-none shadow-2xl rounded-lg bg-blue-300"/>
                    </div>
                }
                <div className="flex justify-center items-center m-5">
                    <img src={emailIcon} alt="" className="size-20"/>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" placeholder="enter your email" className="w-100 h-10 mx-5 px-5 outline-none shadow-2xl rounded-lg bg-blue-300"/>
                </div>
                <div className="flex justify-center items-center m-5">
                    <img src={passwordIcon} alt="" className="size-20"/>
                    <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="enter your password" className="w-100 h-10 mx-5 px-5 outline-none shadow-2xl rounded-lg bg-blue-300"/>
                </div>
                <button onClick={handleSubmit} className="bg-red-500 m-5 p-2 px-7 rounded-3xl text-white cursor-pointer">Submit</button>
                <span className="flex">
                    <p className="px-1">{state === "sign-up" ? "Already registered?" : "Not registered?"}</p>
                    <p onClick={handleState} className="underline cursor-pointer">{state === "sign-up" ? "click here to login" : "click here to create an account"}</p>
                </span>
            </form>
        </div>
    )
}

export default LoginPage;