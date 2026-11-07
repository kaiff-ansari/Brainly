import Button from "../components/Button"
import InputFormContent from "../components/InputFormContent"


const SignIn = () => {
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

        <div className="bg-white rounded-xl border min-w-48 p-8">
            <InputFormContent placeholder="Username"/>
            <InputFormContent placeholder="Password"/>

            <div className="flex justify-center pt-4">
             <Button loading={false} variant="primary" text="Sign In" fullWidth={true} />
            </div>
           
        </div>


    </div>
  )
}

export default SignIn