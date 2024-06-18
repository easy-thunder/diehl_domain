import { useRouter } from "next/router";
import Link from "next/link";

// Sample data for demonstration. Replace this with actual data fetching logic.
const skillsData = {
    "test-skill": {
      title: "Test Skill",
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      tags: ["Tag1", "Tag2", "Tag3"],
      paragraphs: [
        "First paragraph of the test skill.",
        "Second paragraph of the test skill.",
        "Third paragraph of the test skill."
      ]
    },
    "zoom-application": {
      title: "How to Build a Zoom Application with PeerJS, Socket.IO, and EJS",
      blurb: "Learn how to set up a video chat application similar to Zoom using PeerJS, Socket.IO, and EJS.",
      tags: ["WebRTC", "PeerJS", "Socket.IO", "EJS"],
      paragraphs: [
        "In this tutorial, we will walk through the steps required to build a video chat application similar to Zoom using PeerJS, Socket.IO, and EJS.",
        "### Setting Up the Project",
        "First, create a new Node.js project and install the necessary dependencies.",
        "```bash\nmkdir zoom-app\ncd zoom-app\nnpm init -y\nnpm install express ejs socket.io peerjs\n```",
        "### Setting Up the Server",
        "Create a file named `server.js` and set up an Express server with Socket.IO and PeerJS.",
        "```js\nconst express = require('express');\nconst http = require('http');\nconst socketIO = require('socket.io');\nconst { ExpressPeerServer } = require('peer');\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = socketIO(server);\nconst peerServer = ExpressPeerServer(server, { debug: true });\n\napp.set('view engine', 'ejs');\napp.use('/peerjs', peerServer);\napp.use(express.static('public'));\n\napp.get('/', (req, res) => {\n  res.render('index');\n});\n\napp.get('/:room', (req, res) => {\n  res.render('room', { roomId: req.params.room });\n});\n\nio.on('connection', (socket) => {\n  socket.on('join-room', (roomId, userId) => {\n    socket.join(roomId);\n    socket.to(roomId).broadcast.emit('user-connected', userId);\n  });\n});\n\nserver.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});\n```",
        "### Creating the Views",
        "Create an `index.ejs` file for the home page and a `room.ejs` file for the video chat room.",
        "```html\n<!-- views/index.ejs -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Zoom App</title>\n</head>\n<body>\n  <h1>Welcome to Zoom App</h1>\n  <a href=\"/room\">Join a Room</a>\n</body>\n</html>\n```",
        "```html\n<!-- views/room.ejs -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Room <%= roomId %></title>\n  <script src=\"/socket.io/socket.io.js\"></script>\n  <script src=\"https://unpkg.com/peerjs\"></script>\n  <script>\n    const roomId = '<%= roomId %>';\n  </script>\n  <script src=\"/js/room.js\"></script>\n</head>\n<body>\n  <h1>Room <%= roomId %></h1>\n  <video id=\"my-video\" autoplay muted></video>\n  <div id=\"video-grid\"></div>\n</body>\n</html>\n```",
        "### Setting Up the Client",
        "Create a `public/js/room.js` file to handle the client-side logic for connecting to the room and streaming video.",
        "```js\nconst socket = io('/');\nconst videoGrid = document.getElementById('video-grid');\nconst myVideo = document.createElement('video');\nmyVideo.muted = true;\n\nnavigator.mediaDevices.getUserMedia({\n  video: true,\n  audio: true\n}).then(stream => {\n  addVideoStream(myVideo, stream);\n\n  const peer = new Peer(undefined, {\n    path: '/peerjs',\n    host: '/',\n    port: '3000'\n  });\n\n  peer.on('open', id => {\n    socket.emit('join-room', roomId, id);\n  });\n\n  peer.on('call', call => {\n    call.answer(stream);\n    const video = document.createElement('video');\n    call.on('stream', userVideoStream => {\n      addVideoStream(video, userVideoStream);\n    });\n  });\n\n  socket.on('user-connected', userId => {\n    connectToNewUser(userId, stream);\n  });\n\n  function connectToNewUser(userId, stream) {\n    const call = peer.call(userId, stream);\n    const video = document.createElement('video');\n    call.on('stream', userVideoStream => {\n      addVideoStream(video, userVideoStream);\n    });\n  }\n\n  function addVideoStream(video, stream) {\n    video.srcObject = stream;\n    video.addEventListener('loadedmetadata', () => {\n      video.play();\n    });\n    videoGrid.append(video);\n  }\n});\n```",
        "### Conclusion",
        "With the above steps, you have set up a basic video chat application using PeerJS, Socket.IO, and EJS. You can further customize and expand this application by adding more features such as chat, screen sharing, and more."
      ]
    }
  };

export default function IndividualSkill() {
  const router = useRouter();
  const { individualSkill } = router.query;
  const skill = skillsData[individualSkill];

  if (!skill) {
    return <div>Loading...</div>;
  }

  return (
    <div className="individualSkillContainer">
      <div className="individualSkillInner">
        <h2 className="individualSkillTitle">{skill.title}</h2>
        {skill.paragraphs.map((paragraph, index) => (
          <p key={index} className="individualSkillParagraph">{paragraph}</p>
        ))}
        <div className="individualSkillTags">
          {skill.tags.map((tag, index) => (
            <span key={index} className="individualSkillTag">{tag}</span>
          ))}
        </div>
        <Link href="/skills">
          <button className="backButton">Back to Skills</button>
        </Link>
      </div>
    </div>
  );
}