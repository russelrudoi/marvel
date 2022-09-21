import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <Link to='/'>Back</Link>
        </div>
    )
}

export default Page404;