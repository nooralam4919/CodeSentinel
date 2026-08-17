export default function useGithub(){

    const gitlogin = () => {
        window.location.href = "http://localhost:4000/auth/github";
    }

    return {
        gitlogin,
    }
}