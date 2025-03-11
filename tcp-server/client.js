import net from 'net'
import process from "process"

let socket = net.createConnection({host:"192.168.194.253", port : 4000})

process.stdin.on('data', (buffer)=>{
    socket.write(buffer)
})

socket.on('data', (chunk)=>{
    console.log(chunk.toString())
    console.log(socket.remoteAddress)
    console.log(socket.remotePort)
})

socket.on('error', ()=>{
    console.log("Server lost")
})