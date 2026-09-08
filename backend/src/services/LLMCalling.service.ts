const llmCallTogetHumanAns = async(questionForLLM: any, databaseContext: any) => {
    try{
            const response = await fetch(
                "http://review-engine/llmcall/forans",
                {
                    method: "post",
                    headers:{
                        "content-type": "appication/json"
                    },
                    body: JSON.stringify({
                        question: questionForLLM,
                        context: databaseContext
                    })
                }
                
            )

            const data = await response.json();

            if(!response.ok)
            {
                console.log("the data comming from llm call", data);
                console.log("response form llm", response.status);
                
                throw new Error( data.message || "Data is not present in question chunking" );
            }
    } catch (error) {
        console.log("error in llm api call", error);

        const message = error instanceof Error ? error.message : "";
        console.log(message);
    }
}

export {
    llmCallTogetHumanAns
}