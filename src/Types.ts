

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

export enum GameObjectEffect {
    NO_EFFECT,
    AFTERBURNER_ACTIVE,
    ASTEROID_FIELD,
    GAS_CLOUD,
}

export class GameObject{

    constructor(
        public readonly id: string,
        private readonly data: number[],
    ) {}

    get size() {return this.data[0]}
    get speed() {return this.data[1]}
    get direction() {return this.data[2]}
    get type()  {return this.data[3]}
    get x() {return this.data[4]}
    get y() {return this.data[5]}

    get effects(): GameObjectEffect[]{
        const effectsBitSum = this.data[6];
        if (!effectsBitSum) return [];
        switch (effectsBitSum){
            default:
            case 0: return [GameObjectEffect.NO_EFFECT];
            case 1: return [GameObjectEffect.AFTERBURNER_ACTIVE];
            case 2: return [GameObjectEffect.ASTEROID_FIELD];
            case 3: return [GameObjectEffect.AFTERBURNER_ACTIVE, GameObjectEffect.ASTEROID_FIELD];
            case 4: return [GameObjectEffect.GAS_CLOUD];
            case 5: return [GameObjectEffect.GAS_CLOUD, GameObjectEffect.AFTERBURNER_ACTIVE];
            case 6: return [GameObjectEffect.GAS_CLOUD, GameObjectEffect.ASTEROID_FIELD];
            case 7: return [GameObjectEffect.GAS_CLOUD, GameObjectEffect.AFTERBURNER_ACTIVE, GameObjectEffect.ASTEROID_FIELD];
        }
    }

    static randomFixed(size: number, x: number, y: number){
        return new GameObject(Math.random().toString(10), [size, 0, 0, 99, x, y]);
    }
}