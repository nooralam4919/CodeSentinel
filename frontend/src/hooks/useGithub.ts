export default function useGithub(){

    const gitlogin = () => {
        // GitHub OAuth works by redirecting the browser to the backend's
        // /auth/github route. The backend then redirects to GitHub's
        // authorization page. Using window.location.href is required —
        // fetch() won't work because the browser needs to follow the full
        // OAuth redirect chain and set cookies from the backend callback.
        window.location.href = "http://localhost:4000/auth/github";
    }

    return {
        gitlogin,
    }
}