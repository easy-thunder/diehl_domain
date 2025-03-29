
import AuthForm from '@/components/utility/Forms/AuthForm/AuthForm'
import { useSession } from 'next-auth/react'
export default function BearsHaresAndSnares(){
    const { data: session, status } = useSession()

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return         <AuthForm/>;

    console.log(session, status)
    return<>

    </>
}

