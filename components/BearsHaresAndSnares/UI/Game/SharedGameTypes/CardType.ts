export type CardType = {
    id: string;
    name: string;
    description: string;
    image: string;
    effects: string[];
    type: string;
    clan:string;
    owner?: string;
    faceUpForEveryone?: boolean;
    faceUpForSpecificePlayers?: string[];
    isBeingSelected?:boolean ;
    cardClass: string;
    
};
// selector?: string;


