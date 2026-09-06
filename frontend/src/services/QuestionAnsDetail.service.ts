
const ApiCallforSubmittingQuary = async(quary: string)=>{
    const response = await fetch(
        "http://localhost:4000/api/v1/agentreview/query",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: quary
            })
        }
    )

    const data = await response.json();
    console.log("quesitondetail.servie", data)

    if(!response.ok)
        throw new Error(data.message || "Failed to get review response");

    return data;
}

export{
    ApiCallforSubmittingQuary
}