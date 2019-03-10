class Field {
    public startX: number;
    public startY: number;

    public row: number;
    public column: number;

    public number: number;
    public revealed: boolean;
    public flag: boolean;
    public type: FieldType;

    constructor(x: number, y: number, row: number, column: number) {
        this.startX = x;
        this.startY = y;

        this.row = row;
        this.column = column;

        this.number = 0;
        this.revealed = false;
        this.flag = false;
        this.type = FieldType.None;
    }
}

enum FieldType {
    None,
    NoBomb,
    Empty,
    Number,
    Bomb
}

class MousePosition {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class ClientDataObject {
    public mousePosition!: MousePosition;
    public stamp!: number;
    public clientEventType: ClientEventType;

    constructor(clientEventType: ClientEventType.Reset);
    constructor(clientEventType: ClientEventType.Move | ClientEventType.Click | ClientEventType.Flag, mousePosition: MousePosition);
    constructor(clientEventType: ClientEventType.LatencyTest | ClientEventType.LatencyResponse, stamp: number);
    constructor(clientEventType: ClientEventType, arg?: MousePosition | number) {
        if (arg) {
            if (arg instanceof MousePosition) {
                this.mousePosition = arg;
            } else {
                this.stamp = arg;
            }
        }

        this.clientEventType = clientEventType;
    }
}

enum ClientEventType {
    Move,
    Click,
    Flag,
    Reset,
    LatencyTest,
    LatencyResponse
}

class ServerDataObject {
    public mousePosition!: MousePosition;
    public stamp!: number;
    public affectedFields!: Field[];
    public serverEventType: ServerEventType;

    constructor(serverEventType: ServerEventType.Reset);
    constructor(serverEventType: ServerEventType.Move, mousePosition: MousePosition);
    constructor(serverEventType: ServerEventType.LatencyTest | ServerEventType.LatencyResponse, stamp: number);
    constructor(serverEventType: ServerEventType.Game | ServerEventType.GameOver, affectedFields: Field[]);
    constructor(serverEventType: ServerEventType, arg?: MousePosition | number | Field[]) {
        if (arg) {
            if (arg instanceof MousePosition) {
                this.mousePosition = arg;
            } else if (typeof arg === "number") {
                this.stamp = arg;
            } else {
                this.affectedFields = arg;
            }
        }

        this.serverEventType = serverEventType;
    }
}

enum ServerEventType {
    Move,
    Game,
    GameOver,
    Reset,
    LatencyTest,
    LatencyResponse
}
