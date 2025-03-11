import net from 'net'
import process from "process"

let server = net.createServer()

server.listen(4000, '0.0.0.0', () => {
    let { port, address } = server.address()
    console.log(address)
    console.log("Server is listening on port.", port)
})

server.on('connection', (socket) => {
    console.log("Client connected")
    console.log(socket.remoteAddress)
    socket.on('data', (chunk) => {
        console.log(chunk.toString())
        console.log(socket.remoteAddress)
        console.log(socket.remotePort)
        // socket.end()
    })

    
    process.stdin.on('data', (buffer)=>{
        socket.write(buffer)
    })

    socket.on('close', () => {
        console.log(socket.remoteAddress, " : disconnected")
    })

    socket.on('error', ()=>{
        console.log("Client lost", socket.remoteAddress)
    })

})

