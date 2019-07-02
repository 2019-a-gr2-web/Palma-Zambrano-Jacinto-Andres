import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";

@WebSocketGateway(3002, {namespace:'/websockets'})
export class ChatGateway {
    @WebSocketServer() server;
    constructor(){
        console.log(this.server);
    }

    @SubscribeMessage('holaMundo')
    holaMundo(client: Client, data: any){
        console.log(data);
        console.log('Nos hacen una peticion');
        return 'Hola mundo' + data.nombre;
    }
}
