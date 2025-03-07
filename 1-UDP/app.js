import dgram from 'dgram'

const socket = dgram.createSocket('udp4')

socket.on("message", (a, b) => {
    console.log(a.toString(), b)
    socket.send("Message received", 3000, "192.168.130.77", () => {
        socket.close()

    })
})

// socket.send("Hello from mobile", 3000, "192.168.130.77")

socket.bind(4000, () => {
    console.log("listening")
    console.log(socket.address())
})