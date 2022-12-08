import FormComponent from "../components/RegisterForm"
import Navbar from "../components/Navbar"

const Register = () => {
    return(
        <> 
        <Navbar isAuthenticated={false}/>

        <div className="p-4 max-w-md mx-auto"> 
            <FormComponent/>
        </div>
        </>
    )
}

export default Register