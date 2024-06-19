const skillsData = [
    {
        id: "dynamicJSX",
        title: "How to build medium-like blog posts with dynamic rendering",
        blurb: "This skill demonstrates dynamically generating content from data to JSX in React and Next.js.",
        tags: ["React", "Next.js", "dynamic rendering"],
        link: "/skills/dynamicJSX",
        linkText: "Explore making Medium",
        paragraphs: [
          "### Dynamically Generating Content from Data to JSX",
          "When building applications with React and Next.js, you often need to render content dynamically based on data. This involves mapping data structures to JSX components, enabling a flexible and scalable approach to rendering user interfaces.",
          
          "### Example Data Structure",
          "Consider the following `skillsData` object:",
          
          "```js\nconst skillsData = [\n  {\n    id: \"test-skill\",\n    title: \"Test Skill\",\n    blurb: \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.\",\n    tags: [\"Tag1\", \"Tag2\", \"Tag3\"],\n    link: \"/skills/test-skill\",\n    linkText: \"Press for link\",\n    paragraphs: [\n      \"First paragraph of the test skill.\",\n      \"Second paragraph of the test skill.\",\n      \"Third paragraph of the test skill.\"\n    ]\n  },\n  // More skills can be added here\n];\n```",
          
          "### Rendering Data in JSX",
          "To dynamically generate JSX from this data, you can map over the `skillsData` array and render each item using a component like `FullStretchCard`.",
          
          "### Example Component (`skills.js`)",
          "```js\nimport FullStretchCard from \"@/components/utility/button/fullStretchCard\";\nimport skillsData from \"@/data/skillsData\";\n\nexport default function Skills() {\n  return (\n    <>\n      {skillsData.map((skill, index) => (\n        <FullStretchCard\n          key={index}\n          title={skill.title}\n          blurb={skill.blurb}\n          tags={skill.tags.join(', ')}\n          link={skill.link}\n          linkText={skill.linkText}\n        />\n      ))}\n    </>\n  );\n}\n```",
          
          "In this example, `skillsData.map` iterates over each skill, passing the relevant properties to `FullStretchCard` components.",
          
          "### Handling Dynamic Routes with `useRouter`",
          "Next.js provides the `useRouter` hook to handle dynamic routes. This is particularly useful for pages that display content based on URL parameters.",
          
          "### Example Component (`[individualSkill].js`)",
          "```js\nimport { useRouter } from \"next/router\";\nimport Link from \"next/link\";\nimport skillsData from \"@/data/skillsData\";\n\nexport default function IndividualSkill() {\n  const router = useRouter();\n  const { individualSkill } = router.query;\n  const skill = skillsData.find(skill => skill.id === individualSkill);\n  \n  if (!skill) {\n    return <div>Loading...</div>;\n  }\n  \n  return (\n    <div className=\"individualSkillContainer\">\n      <div className=\"individualSkillInner\">\n        <h2 className=\"individualSkillTitle\">{skill.title}</h2>\n        {skill.paragraphs.map((paragraph, index) => (\n          <div key={index} className=\"individualSkillParagraph\">\n            {paragraph.startsWith(\"```\") ? (\n              <pre>\n                <code>{paragraph.replace(/```/g, \"\")}</code>\n              </pre>\n            ) : (\n              paragraph.startsWith(\"###\") ?\n                <b>{paragraph.replace(/###/g, \"\")}</b> :\n                <p>{paragraph}</p>\n            )}\n          </div>\n        ))}\n        <div className=\"individualSkillTags\">\n          {skill.tags.map((tag, index) => (\n            <span key={index} className=\"individualSkillTag\">{tag}</span>\n          ))}\n        </div>\n        <Link href=\"/skills\">\n          <button className=\"backButton\">Back to Skills</button>\n        </Link>\n      </div>\n    </div>\n  );\n}\n```",
          
          "### Understanding `useRouter`",
          "- **useRouter Hook**: The `useRouter` hook from Next.js allows you to access the router object, which contains information about the current route.",
          "- **router.query**: This object holds the dynamic route parameters. In this case, `individualSkill` is extracted from `router.query`.",
          
          "### Breaking Down the Ternary Statement",
          "The ternary statement in the component above conditionally renders different elements based on the content of the paragraph.",
          
          "```js\n{paragraph.startsWith(\"```\") ? (\n  <pre>\n    <code>{paragraph.replace(/```/g, \"\")}</code>\n  </pre>\n) : (\n  paragraph.startsWith(\"###\") ?\n    <b>{paragraph.replace(/###/g, \"\")}</b> :\n    <p>{paragraph}</p>\n)}\n```",
          
          "- **Condition Check**: `paragraph.startsWith(\"```\")`\n  - If the paragraph starts with \"``\"\", it indicates a code block.\n  - The code inside the block is wrapped in `<pre>` and `<code>` tags after removing the \"``\"\" markers.",
          
          "- **Nested Condition Check**: `paragraph.startsWith(\"###\")`\n  - If the paragraph starts with \"###\", it indicates a heading.\n  - The heading text is wrapped in `<b>` tags after removing the \"###\" markers.",
          
          "- **Default Case**: `<p>{paragraph}</p>`\n  - If neither condition is met, the paragraph is treated as regular text and wrapped in `<p>` tags.",

          "Utilizing ternaries and the startsWith method you can add many different start conditions to your paragraphs. You could even add photo paths by designating a start condition for a photo src.",
          "&&&/jake fancy.jpg",
          
          "### Conclusion",
          "By using a centralized data file and dynamically rendering content with React and Next.js, you can create flexible and scalable applications. The `useRouter` hook facilitates dynamic routing, allowing you to build pages that respond to URL parameters. The ternary operator in JSX enables conditional rendering, making your components more dynamic and responsive to different types of content."
        ]
      },
    {
      id: "zoom-application",
      title: "How to Build a Zoom Application with PeerJS, Socket.IO, and EJS",
      blurb: "Learn how to set up a video chat application similar to Zoom using PeerJS, Socket.IO, and EJS.",
      tags: ["WebRTC", "PeerJS", "Socket.IO", "EJS"],
      link: "/skills/zoom-application",
      linkText:"Explore making zoom",
      paragraphs: [
        "Let's explore the different possibilities of connecting with other people on the internet. In all of our examples we will use client A as reference to sending information to client B. When you first learn about web development you likely learned about HTTP requests such as fetch or axios. HTTP requests are great as they validate the information that is coming into and out of your server. However, without refreshing client B won't see what client A posted. There have been work around for this such as long polling(Sending a get request to the server and the server holds that request until an update happens). Long Polling is great for handling updates, but its slow because client A has to send a message to the server. The server has to process the message, check it against a database, route the message to the correct user and has to ensure that Client B has sent a GET request to the server. This is not great for sending 30-60 frames of video per second to a user. Socket.io is an upgrade in speed. Socket.io relies on TCP connections. A TCP connection is able to cut out the database and we can establish a connection directly from client A to server to client B. However, we are essentially doubling the length it takes to send a message to a user so this still is not viable for video connection. This is where PeerJS is a library that works with socket.io(to establish an initial connection) that is PeerJS comes in handy. PeerJS relies on UDP which allows client A to connect directly with client B after an initial handshake. This is a reliable way to send information from client A to client B at 30-60 frames per second. PeerJS gives you the option to make live video feeds, transfer gaming data back and forth, or make collaborative design software. The Possibilities are extensive. In this tutorial, we will walk through the steps required to build a video chat application similar to Zoom using PeerJS, Socket.IO, and EJS.",
        "### Setting Up the Project",
        "First, create a new Node.js project and install the necessary dependencies.",
        "```bash\nmkdir zoom-app\ncd zoom-app\nnpm init -y\nnpm install express ejs socket.io peerjs\n```",
        "### Setting Up the Server",
        "Create a file named `server.js` and set up an Express server with Socket.IO and PeerJS.",
        "```js\nconst express = require('express');\nconst http = require('http');\nconst socketIO = require('socket.io');\nconst { ExpressPeerServer } = require('peer');\nconst app = express();\nconst server = http.createServer(app);\nconst io = socketIO(server);\nconst peerServer = ExpressPeerServer(server, { debug: true });\napp.set('view engine', 'ejs');\napp.use('/peerjs', peerServer);\napp.use(express.static('public'));\napp.get('/', (req, res) => {\n  res.render('index');\n});\napp.get('/:room', (req, res) => {\n  res.render('room', { roomId: req.params.room });\n});\nio.on('connection', (socket) => {\n  socket.on('join-room', (roomId, userId) => {\n    socket.join(roomId);\n    socket.to(roomId).broadcast.emit('user-connected', userId);\n  });\n});\nserver.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});\n```",
        "### Creating the Views",
        "Create an `index.ejs` file for the home page and a `room.ejs` file for the video chat room.",
        "```html\n<!-- views/room.ejs -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Room <%= roomId %></title>\n  <script src=\"/socket.io/socket.io.js\"></script>\n  <script src=\"https://unpkg.com/peerjs\"></script>\n  <script>\n    const roomId = '<%= roomId %>';\n  </script>\n  <script src=\"/js/room.js\"></script>\n</head>\n<body>\n  <h1>Room <%= roomId %></h1>\n  <video id=\"my-video\" autoplay muted></video>\n  <div id=\"video-grid\"></div>\n</body>\n</html>\n```",
        "### Setting Up the Client",
        "Create a `public/js/room.js` file to handle the client-side logic for connecting to the room and streaming video.",
        "```js\nconst socket = io('/');\nconst videoGrid = document.getElementById('video-grid');\nconst myVideo = document.createElement('video');\nmyVideo.muted = true;\nnavigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {\n  addVideoStream(myVideo, stream);\n  const peer = new Peer(undefined, { path: '/peerjs', host: '/', port: '3000' });\n  peer.on('open', id => {\n    socket.emit('join-room', roomId, id);\n  });\n  peer.on('call', call => {\n    call.answer(stream);\n    const video = document.createElement('video');\n    call.on('stream', userVideoStream => {\n      addVideoStream(video, userVideoStream);\n    });\n  });\n  socket.on('user-connected', userId => {\n    connectToNewUser(userId, stream);\n  });\n  function connectToNewUser(userId, stream) {\n    const call = peer.call(userId, stream);\n    const video = document.createElement('video');\n    call.on('stream', userVideoStream => {\n      addVideoStream(video, userVideoStream);\n    });\n  }\n  function addVideoStream(video, stream) {\n    video.srcObject = stream;\n    video.addEventListener('loadedmetadata', () => {\n      video.play();\n    });\n    videoGrid.append(video);\n  }\n});\n```",
        "### Conclusion",
        "With the above steps, you have set up a basic video chat application using PeerJS, Socket.IO, and EJS. You can further customize and expand this application by adding more features such as chat, screen sharing, and more."
      ]
    },
    {
        id: "chrome-extension-web-scrape",
        title: "Using Chrome Extensions to Web Scrape Data",
        blurb: "Learn how to use Chrome extensions to scrape data from web pages efficiently.",
        tags: ["Chrome Extensions", "Web Scraping", "JavaScript"],
        link: "/skills/chrome-extension-web-scrape",
        linkText: "Learn to Web Scrape with Chrome Extensions",
        paragraphs: [
          "### Introduction to Chrome Extensions for Web Scraping",
          "Chrome extensions can be a powerful tool for scraping data directly from web pages. By creating a content script, you can interact with web pages, extract information, and even manipulate the page's appearance.",
          
          "### Creating the Manifest File",
          "The manifest file is the first step in creating a Chrome extension. It defines the metadata of your extension and specifies the content script.",
          
          "```json\n{\n  \"manifest_version\": 3,\n  \"name\": \"Web Scraper\",\n  \"version\": \"1.0\",\n  \"content_scripts\": [\n    {\n      \"matches\": [\"<all_urls>\"],\n      \"js\": [\"content.js\"]\n    }\n  ]\n}\n```",
          
          "### Using Query Selector in content.js",
          "In your `content.js` file, you can use `document.querySelector` to target and extract data from specific elements on a web page.",
          
          "```js\n// content.js\nconst jobTitle = document.querySelector('.job-title').innerText;\nconst company = document.querySelector('.company-name').innerText;\nconst jobDescription = document.querySelector('.job-description').innerText;\n```",
          
          "### Addressing Loading Issues",
          "One common issue when scraping data is ensuring that all elements have fully loaded. While using the `onLoad` event listener is recommended, it doesn't always guarantee that all elements are accessible. To handle this, you can use a `setTimeout` function to delay the script execution.",
          
          "```js\nwindow.addEventListener('load', () => {\n  setTimeout(() => {\n    // Your scraping logic here\n  }, 2000); // Wait for 2 seconds\n});\n```",
          
          "### Changing Background Color",
          "You can manipulate the DOM to change the appearance of the webpage. For instance, changing the background color to pink can be done using:",
          
          "```js\ndocument.body.style.backgroundColor = 'pink';\n```",
          
          "### Practical Application: LinkedIn Web Scraper",
          "Using these techniques, I created a Chrome extension to scrape job postings from LinkedIn. The extension extracts information such as the job title, company, job description, and mutual skills. Here's an example of how the data is collected:",
          
          "```js\n// Example scraping logic\nconst jobTitle = document.querySelector('.job-title').innerText;\nconst company = document.querySelector('.company-name').innerText;\nconst jobDescription = document.querySelector('.job-description').innerText;\nconst mutualSkills = Array.from(document.querySelectorAll('.mutual-skills')).map(skill => skill.innerText);\n```",
          
          "### Automating Cover Letter Customization",
          "I further automated the job application process by integrating the scraped data with a SQL database containing cover letter templates. Each template had placeholders for skills, which were replaced with the mutual skills identified in the job posting.",
          
          "Finally, the job details and the customized cover letter were sent to ChatGPT to refine the content. The process ensured the cover letters were personalized, compliant with AI detection systems, and ready for submission at the click of a button.",
          
          "### Conclusion",
          "Using Chrome extensions to scrape web data can significantly enhance your ability to automate and streamline tasks. This example demonstrates how accessing and manipulating webpage content can be practically applied, from collecting data to automating job applications."
        ]
      }
  ];
  
  export default skillsData;