import * as signalR from "@microsoft/signalr";

class SignalRService {
    constructor() {
        this.connection = null;
    }

    startConnection = (roomId, token) => {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7209/hubs/gamingRoom', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();

        this.connection.start()
            .then(() => {
                console.log("Connected to SignalR");
                this.joinRoom(roomId);
            })
            .catch(err => console.log("Error while starting connection: " + err));

        this.connection.onclose(() => console.log("Connection closed"));
    }
    joinRoom = (roomId) => {
        if (this.connection) {
            roomId = parseInt(roomId);
            this.connection.invoke("JoinRoom", roomId)
                .then(() => console.log(`Joined room ${roomId}`))
                .catch(err => console.log("Error while joining room: " + err));
        }
    }

    stopConnection = () => {
        if (this.connection) {
            this.connection.stop()
                .then(() => console.log("Connection stopped"))
                .catch(err => console.log("Error while stopping connection: " + err));
        }
    }

    sendMessage = (message) => {
        if (this.connection) {
            this.connection.invoke("SendMessage", message)
                .catch(err => console.error(err));
        }
    }

    onMessageReceived = (callback) => {
        if (this.connection) {
            console.log("Setting up ReceiveMessage handler");
            this.connection.on("ReceiveMessage", callback);
        }
    }
}

export default new SignalRService();
