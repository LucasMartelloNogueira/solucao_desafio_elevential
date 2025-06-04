import { useRouteError } from "react-router-dom";

export default function ErrorPage() {

    const error: Error = useRouteError() as Error;

    return (
        <>{error.message}</>
    )
}