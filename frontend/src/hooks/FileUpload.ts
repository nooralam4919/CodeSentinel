const FileUpload = () => {
    const fileToBackend = async (file: File) => {
        const formData = new FormData();

        formData.append("downlodedFile", file);

        console.log("FormData file:", formData.get("downlodedFile"));

        const response = await fetch(
            "http://localhost:4000/api/v1/user/upload",
            {
                method: "POST",
                credentials: "include",
            body: formData,
            }
        );

        const data = await response.json();

        console.log("Upload response:", data);

        if (!response.ok) {
            throw new Error(data.message || "File upload failed");
        }

        return data;
    };

    return {
        fileToBackend,
    };
};

export default FileUpload;