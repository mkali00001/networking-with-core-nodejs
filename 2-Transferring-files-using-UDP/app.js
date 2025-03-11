import dgram from "dgram"
import { createWriteStream } from "fs"

let socket = dgram.createSocket('udp4')
let writeStream = createWriteStream('number.txt')
socket.on("message", async (message,remote)=>{
    let data = message.toString()
    if (data.trim() === "END") {
        console.log("Server: All data received");

         let response = "Data received";
        socket.send(response, remote.port, remote.address, (err) => {
            if (err) console.error("Error sending acknowledgment:", err);
        });

        writeStream.end();
    } else {
        writeStream.write(data);
    }
})



socket.bind(4000, ()=>{
    console.log(socket.address())
})