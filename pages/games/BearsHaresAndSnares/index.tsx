import { useUser } from '@/context/UserContext'
import AuthForm from '@/components/utility/Forms/AuthForm/AuthForm'
export default function BearsHaresAndSnares(){

    const {user,loading} = useUser()
    if(loading){return <>loading...</>}//TODO MAKE A LOADING modal
    const isAuthenticated = !!user?.aud;

    return( 
        <>
            { isAuthenticated? <>
                You're logged in!
            </>: 
            <AuthForm/>}
        </>
    )
}

