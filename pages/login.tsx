import LoginForm from "../components/LoginForm"
import Navbar from "../components/Navbar"

const Login = () => {
    return(
        <> 
        <Navbar isAuthenticated={false}/>
        <div className="p-4 max-w-md mx-auto"> 
            <LoginForm/>
        </div>
        </>
        
    )
}

export default Login