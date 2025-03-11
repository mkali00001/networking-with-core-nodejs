import dgram from "dgram"
import { createReadStream } from "fs"
import { readFile } from "fs/promises"

let socket = dgram.createSocket("udp4")

let readStream = createReadStream("C:\\Users\\DELL\\Desktop\\numbers.txt", {highWaterMark:1000})

readStream.on("data", (chunk) => {
    socket.send(chunk, 4000, "172.30.128.1")
})

readStream.on("end", ()=>{
    console.log("Client : All data sended")
    socket.send("END", 4000, "172.30.128.1", (err) => {
        if (err) console.error("Error sending END message:", err);
    });
})


socket.on("message", (message) => {
    console.log("Server says:", message.toString()); // This will display "Data received"
    socket.close(); // Close the client socket after receiving acknowledgment
});