import { useCallback } from "react";

export function useLeaveLobby(){
    const handShakeUrl = process.env.NEXT_PUBLIC_HANDSHAKE_URL;


    const leaveLobby= useCallback(async (lobbyId: string, peerId: string) => {
        console.log(`${handShakeUrl}/lobby/${lobbyId}/leaveLobby`)
        try{
            const response = await fetch(`${handShakeUrl}/lobby/${lobbyId}/leaveLobby`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    peerId:peerId
                })
            })
            if(!response.ok){
                throw new Error("Failed to leave lobby");
            }
            return await response.json();
        }
        catch(error){
            console.error("Error leaving lobby:", error);
            throw error;
        }
    }, [handShakeUrl])

    return {leaveLobby}
}