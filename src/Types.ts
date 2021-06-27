

export type GameTickPayload = {
    "World": {
        "CenterPoint": {
            "X": number,
            "Y": number
        },
        "Radius": number,
        "CurrentTick": number,
    },
    "GameObjects": {[Key: string]: number[]},
    "PlayerObjects": {[Key: string]: number[]},
}

