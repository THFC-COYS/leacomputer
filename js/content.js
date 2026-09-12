/* LEA Launchpad — curriculum content
 * Three tracks by grade band, five days each, three activities per day:
 *   1) flashcards (learn)  2) match | sequence (practice)  3) quiz (check)
 */
const CONTENT = {
  bands: {
    explorers: { label: "Explorers", grades: "Grades K–2", blurb: "Big buttons, pictures, and games.", color: "#ff6a3d" },
    builders:  { label: "Builders",  grades: "Grades 3–5", blurb: "Hands-on practice with real steps.", color: "#3454d1" },
    innovators:{ label: "Innovators",grades: "Grades 6–12", blurb: "Real scenarios and troubleshooting.", color: "#8a5dff" }
  },

  days: [
    { n: 1, title: "Meet Your Machine", icon: "🖥️" },
    { n: 2, title: "Mouse, Keys & Windows", icon: "🖱️" },
    { n: 3, title: "The Internet & Browser", icon: "🌐" },
    { n: 4, title: "Class & Email", icon: "🎒" },
    { n: 5, title: "Video Calls & Ready for Day One", icon: "🎥" }
  ],

  activities: {
    // ============ DAY 1 ============
    explorers_1: [
      { id:"e1a", type:"flashcards", title:"Parts of My Computer", icon:"🔎", data:{ items:[
        { front:"⏻ Power Button", back:"Press this to turn your computer ON. Press and hold to turn it OFF." },
        { front:"🖵 Screen", back:"This is where you see everything! Be gentle with it." },
        { front:"⌨️ Keyboard", back:"Use your fingers to press letters and make words." },
        { front:"👆 Trackpad", back:"Slide one finger to move the arrow. Tap once to click." },
        { front:"🔌 Charger", back:"Plug this in when the battery is low." }
      ]}},
      { id:"e1b", type:"match", title:"Match the Part", icon:"🧩", data:{ pairs:[
        { left:"⏻ Power Button", right:"Turns the computer on and off" },
        { left:"🖵 Screen", right:"Shows you pictures and words" },
        { left:"⌨️ Keyboard", right:"Has letters and numbers to press" },
        { left:"👆 Trackpad", right:"Moves the arrow on the screen" }
      ]}},
      { id:"e1c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"Which button turns your computer ON?", choices:["⏻ Power Button","🖵 Screen","🔌 Charger"], correct:0, correctMsg:"Yes! That's the power button!", incorrectMsg:"Not quite — look for the ⏻ symbol." },
        { prompt:"What do you use to move the arrow on the screen?", choices:["⌨️ Keyboard","👆 Trackpad","🔌 Charger"], correct:1, correctMsg:"Great job!", incorrectMsg:"Try again — think about sliding your finger." }
      ]}}
    ],
    builders_1: [
      { id:"b1a", type:"flashcards", title:"Getting Started", icon:"🔎", data:{ items:[
        { front:"⏻ Power Button", back:"Press once to turn on. Wait a moment for it to load." },
        { front:"👤 Username", back:"A special name that tells the computer who you are." },
        { front:"🔑 Password", back:"A secret code only you know. Never share it!" },
        { front:"🔋 Battery", back:"Check the icon in the corner — plug in if it's low." }
      ]}},
      { id:"b1b", type:"sequence", title:"Turn On & Log In", icon:"🔢", data:{ steps:[
        "Open the laptop lid",
        "Press the power button",
        "Wait for the login screen to appear",
        "Click your name or type your username",
        "Type your password carefully",
        "Press Enter"
      ]}},
      { id:"b1c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"What should you do if someone asks for your password?", choices:["Tell them right away","Never share it — keep it secret","Write it on your desk"], correct:1, correctMsg:"Exactly — passwords are private!", incorrectMsg:"Passwords should always stay secret." },
        { prompt:"What's the very first step to using your computer?", choices:["Type your password","Press the power button","Close the lid"], correct:1, correctMsg:"Correct!", incorrectMsg:"You need power first!" },
        { prompt:"If your battery icon is low, what should you do?", choices:["Ignore it","Plug in the charger","Turn up the screen brightness"], correct:1, correctMsg:"Smart thinking!", incorrectMsg:"A low battery needs a charger." }
      ]}}
    ],
    innovators_1: [
      { id:"i1a", type:"flashcards", title:"Your Device, Up Close", icon:"🔎", data:{ items:[
        { front:"Chromebook vs. Windows vs. Mac", back:"They look different but do the same basic jobs: open apps, browse the web, save your work." },
        { front:"Function Keys (F1–F12 or top row)", back:"On a Chromebook these control volume, brightness, and browser tabs instead of F1-F12." },
        { front:"Sign-in Account", back:"Your school account keeps your files, grades, and settings tied to you on any device." },
        { front:"Sleep vs. Shut Down", back:"Closing the lid usually sleeps it (fast to resume). Shutting down fully powers it off." }
      ]}},
      { id:"i1b", type:"quiz", title:"Troubleshoot: Screen Won't Turn On", icon:"🛠️", data:{ questions:[
        { prompt:"Your screen is black and nothing happens when you press keys. What's the BEST first step?", choices:["Assume it's broken and give up","Check that it's charged, then hold the power button for 10 seconds","Throw it and get a new one"], correct:1, correctMsg:"Right — most 'dead' screens just need power or a restart.", incorrectMsg:"Start simple: check the charge and try a hard restart." }
      ]}},
      { id:"i1c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"Why does your school account matter across devices?", choices:["It doesn't matter","It keeps your files and settings with you wherever you log in","It only works on one computer"], correct:1, correctMsg:"Exactly right.", incorrectMsg:"Your account travels with you between devices." },
        { prompt:"What's the difference between sleep and shut down?", choices:["No difference","Sleep is quick-pause, shut down fully powers off","Shut down is faster to resume"], correct:1, correctMsg:"Nice work.", incorrectMsg:"Sleep pauses; shut down powers off completely." }
      ]}}
    ],

    // ============ DAY 2 ============
    explorers_2: [
      { id:"e2a", type:"flashcards", title:"Clicking Around", icon:"🔎", data:{ items:[
        { front:"👆 One Tap (Click)", back:"Tap once to choose something, like picking a crayon." },
        { front:"👆👆 Two Taps (Double-Click)", back:"Tap twice, fast, to open something, like opening a book." },
        { front:"↕️ Scroll", back:"Slide two fingers up and down to see more of the page." }
      ]}},
      { id:"e2b", type:"match", title:"Match the Action", icon:"🧩", data:{ pairs:[
        { left:"👆 Click", right:"Choose or select something" },
        { left:"👆👆 Double-Click", right:"Open a program or file" },
        { left:"↕️ Scroll", right:"See more of the page" }
      ]}},
      { id:"e2c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"How do you open a program on the screen?", choices:["Click once","Double-click","Scroll"], correct:1, correctMsg:"You've got it!", incorrectMsg:"Try two quick taps." }
      ]}}
    ],
    builders_2: [
      { id:"b2a", type:"flashcards", title:"Windows & Apps", icon:"🔎", data:{ items:[
        { front:"🗔 Open a Window", back:"Click an app's icon to open it in its own window." },
        { front:"❌ Close a Window", back:"Click the X in the corner to close it when you're done." },
        { front:"🔀 Switch Windows", back:"Click a different window, or use the taskbar/shelf, to jump between apps." },
        { front:"↔️ Resize a Window", back:"Drag a corner or edge to make a window bigger or smaller." }
      ]}},
      { id:"b2b", type:"sequence", title:"Open a Google Doc", icon:"🔢", data:{ steps:[
        "Click the app launcher or open your browser",
        "Go to Google Drive or docs.google.com",
        "Click the + New button",
        "Choose Google Docs",
        "Give your document a title",
        "Start typing!"
      ]}},
      { id:"b2c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"How do you close a window you're finished using?", choices:["Click the X in the corner","Unplug the computer","Press the power button"], correct:0, correctMsg:"Correct!", incorrectMsg:"Look for the X in the corner." },
        { prompt:"You have two windows open. How do you switch to the other one?", choices:["Restart the computer","Click the other window or its taskbar icon","Close both windows"], correct:1, correctMsg:"That's it!", incorrectMsg:"Just click on the other window." },
        { prompt:"What lets you make a window bigger?", choices:["Dragging its edge or corner","Clicking the power button","Typing faster"], correct:0, correctMsg:"Nice!", incorrectMsg:"Try dragging the edge or corner." }
      ]}}
    ],
    innovators_2: [
      { id:"i2a", type:"flashcards", title:"Shortcuts & Menus", icon:"🔎", data:{ items:[
        { front:"Ctrl+C / Ctrl+V (Cmd on Mac)", back:"Copy and paste text or files without dragging things manually." },
        { front:"Alt+Tab / Cmd+Tab", back:"Quickly switch between open apps or windows." },
        { front:"Right-Click Menu", back:"Right-click (or two-finger tap) to see options like rename, copy, or delete." },
        { front:"Tabs vs. Windows", back:"Tabs are pages inside one browser window; windows are separate browser instances." }
      ]}},
      { id:"i2b", type:"quiz", title:"Which Shortcut?", icon:"🛠️", data:{ questions:[
        { prompt:"You want to copy a sentence and paste it into another document. Fastest way?", choices:["Retype it from memory","Select it, Ctrl/Cmd+C, click new spot, Ctrl/Cmd+V","Take a screenshot"], correct:1, correctMsg:"Exactly — copy and paste saves time.", incorrectMsg:"Copy/paste shortcuts are built for this." },
        { prompt:"On a Mac, which key replaces 'Ctrl' for most shortcuts?", choices:["Cmd (⌘)","Fn","Caps Lock"], correct:0, correctMsg:"Right!", incorrectMsg:"Mac uses the Cmd (⌘) key." }
      ]}},
      { id:"i2c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"What's the difference between a tab and a window?", choices:["No difference","Tabs are pages inside one window; windows are separate instances","Windows are inside tabs"], correct:1, correctMsg:"You've got it.", incorrectMsg:"Tabs live inside a window." }
      ]}}
    ],

    // ============ DAY 3 ============
    explorers_3: [
      { id:"e3a", type:"flashcards", title:"Meet the Browser", icon:"🔎", data:{ items:[
        { front:"🧭 Browser", back:"The app you use to visit websites, like Chrome." },
        { front:"⬅️ Back Button", back:"Takes you to the page you just saw." },
        { front:"🏠 Home Button", back:"Takes you back to your starting page." }
      ]}},
      { id:"e3b", type:"match", title:"Match the Button", icon:"🧩", data:{ pairs:[
        { left:"⬅️ Back", right:"Go to the last page you saw" },
        { left:"🏠 Home", right:"Go back to your starting page" },
        { left:"⭐ Star", right:"Save a page you like" }
      ]}},
      { id:"e3c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"If you land on the wrong page, what button helps you go back?", choices:["⬅️ Back","🏠 Home","⭐ Star"], correct:0, correctMsg:"Yes!", incorrectMsg:"Look for the arrow pointing left." }
      ]}}
    ],
    builders_3: [
      { id:"b3a", type:"flashcards", title:"Browsing Basics", icon:"🔎", data:{ items:[
        { front:"🔖 Tabs", back:"Open several pages at once, each in its own tab at the top." },
        { front:"⭐ Bookmarks", back:"Save a page so you can find it again quickly." },
        { front:"🔍 Search Bar vs. Address Bar", back:"On most browsers they're the same bar — type a question OR a website address." },
        { front:"🛡️ Safe Searching", back:"Only click results and links you trust. Ask an adult if something looks strange." }
      ]}},
      { id:"b3b", type:"sequence", title:"Search Safely for Info", icon:"🔢", data:{ steps:[
        "Open a new tab",
        "Click the search bar",
        "Type a clear question",
        "Press Enter",
        "Look at a few trusted results",
        "Click the one that looks safe and helpful"
      ]}},
      { id:"b3c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"A pop-up says 'You won a free prize, click here!' What should you do?", choices:["Click it right away","Close it and tell an adult if unsure","Enter your name and address"], correct:1, correctMsg:"Great safety instinct!", incorrectMsg:"Surprise prizes online are usually a trick — don't click." },
        { prompt:"What do bookmarks help you do?", choices:["Delete a page forever","Save a page to find again later","Print a page"], correct:1, correctMsg:"Correct!", incorrectMsg:"Bookmarks are for saving pages you want to revisit." },
        { prompt:"How can you have several web pages open at once?", choices:["Use multiple tabs","Restart the computer for each page","You can only view one page ever"], correct:0, correctMsg:"Yes, tabs!", incorrectMsg:"Tabs let you open many pages at once." }
      ]}}
    ],
    innovators_3: [
      { id:"i3a", type:"flashcards", title:"Reading a Web Address", icon:"🔎", data:{ items:[
        { front:"🔒 Lock Icon / HTTPS", back:"Means the connection is encrypted. Look for it, especially before entering any info." },
        { front:"URL Parts", back:"e.g. 'classroom.google.com' — the middle part is usually the real site name." },
        { front:"Extensions", back:"Small add-ons for your browser — only install ones your school approves." },
        { front:"Tab Overload", back:"Too many tabs slow your computer down — close ones you're done with." }
      ]}},
      { id:"i3b", type:"quiz", title:"Spot the Red Flag", icon:"🛠️", data:{ questions:[
        { prompt:"A window pops up saying 'Your computer has a virus — call this number now!' What's the smart move?", choices:["Call the number immediately","Close the window/tab without clicking anything inside it, then tell a teacher/IT", "Enter your school password to 'fix' it"], correct:1, correctMsg:"Exactly — that's a classic scam pop-up.", incorrectMsg:"That's a scam pattern — never call or enter info; close it and report it." }
      ]}},
      { id:"i3c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"What does the lock icon in the address bar tell you?", choices:["The page is boring","The connection is encrypted/secure","The page is offline"], correct:1, correctMsg:"Right.", incorrectMsg:"It signals an encrypted, more secure connection." },
        { prompt:"Why close tabs you're not using?", choices:["It's required by law","Too many can slow your computer down","Tabs cost money"], correct:1, correctMsg:"Yep — keeps things running smoothly.", incorrectMsg:"Extra tabs use memory and can slow things down." }
      ]}}
    ],

    // ============ DAY 4 ============
    explorers_4: [
      { id:"e4a", type:"flashcards", title:"My Classroom", icon:"🔎", data:{ items:[
        { front:"🏫 Class App", back:"This is where you see your teacher and classwork." },
        { front:"✋ Raise Hand Button", back:"Tap this instead of shouting, so your teacher knows you have a question." },
        { front:"✅ Submit/Turn In", back:"Tap this button when your work is finished." }
      ]}},
      { id:"e4b", type:"match", title:"Match the Button", icon:"🧩", data:{ pairs:[
        { left:"✋ Raise Hand", right:"Ask a question without talking" },
        { left:"🔇 Mute", right:"Turn off your microphone" },
        { left:"✅ Submit", right:"Turn in your finished work" }
      ]}},
      { id:"e4c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"You have a question during class. What do you tap?", choices:["✋ Raise Hand", "✅ Submit", "🔇 Mute"], correct:0, correctMsg:"Yes!", incorrectMsg:"Raise your hand to ask!" }
      ]}}
    ],
    builders_4: [
      { id:"b4a", type:"flashcards", title:"Classroom & Email", icon:"🔎", data:{ items:[
        { front:"📋 Google Classroom / LMS", back:"Where you find assignments, due dates, and messages from your teacher." },
        { front:"📎 Attachments", back:"Files (like photos or documents) you can add to an assignment or email." },
        { front:"📧 School Email", back:"Check it daily — teachers send updates and reminders there." },
        { front:"📅 Due Dates", back:"Always check when work is due so you don't miss it." }
      ]}},
      { id:"b4b", type:"sequence", title:"Turn In an Assignment", icon:"🔢", data:{ steps:[
        "Log into your Classroom/LMS",
        "Click on the assignment",
        "Read the instructions",
        "Finish your work",
        "Click 'Attach' if a file is needed",
        "Click 'Turn In' or 'Submit'"
      ]}},
      { id:"b4c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"Where do you find your assignments and due dates?", choices:["Google Classroom / your LMS","A paper note","Nowhere, ask a friend"], correct:0, correctMsg:"Correct!", incorrectMsg:"Your Classroom/LMS is the go-to spot." },
        { prompt:"You finished your work. What's the last step to turn it in?", choices:["Close the tab","Click 'Turn In' or 'Submit'","Take a screenshot"], correct:1, correctMsg:"That's it!", incorrectMsg:"You must click Turn In/Submit — closing the tab isn't enough." },
        { prompt:"How often should you check your school email?", choices:["Never","Once a year","Daily"], correct:2, correctMsg:"Great habit!", incorrectMsg:"Check it daily so you don't miss updates." }
      ]}}
    ],
    innovators_4: [
      { id:"i4a", type:"flashcards", title:"Staying Organized", icon:"🔎", data:{ items:[
        { front:"Multiple Classes, Multiple Tabs", back:"Pin frequently used tabs, and bookmark each class page for quick access." },
        { front:"Email Etiquette", back:"Use a clear subject, greet the teacher, explain your question, and sign your name." },
        { front:"Calendar Integration", back:"Add due dates to a calendar app so nothing sneaks up on you." },
        { front:"Version History", back:"Google Docs auto-saves — you can restore earlier versions if something goes wrong." }
      ]}},
      { id:"i4b", type:"quiz", title:"Pick the Best Email", icon:"🛠️", data:{ questions:[
        { prompt:"Which email to a teacher is the BEST example of good etiquette?", choices:[
            "'hey i need the hw' (no subject, no name)",
            "Subject: 'Question about tonight's math homework' — 'Hi Ms. Rivera, I'm stuck on problem 4. Could you help? Thank you, Sam'",
            "A meme with no words"
          ], correct:1, correctMsg:"Perfect — clear subject, polite tone, signed name.", incorrectMsg:"Look for a clear subject line, polite greeting, and your name." }
      ]}},
      { id:"i4c", type:"quiz", title:"Quick Check", icon:"⭐", data:{ questions:[
        { prompt:"What can you do if you accidentally delete part of a Google Doc?", choices:["Nothing, it's gone forever","Use version history to restore an earlier version","Retype the whole document"], correct:1, correctMsg:"Exactly right.", incorrectMsg:"Version history can save the day." },
        { prompt:"Why bookmark each of your class pages?", choices:["It's required","Faster access without searching each time","It makes the browser faster"], correct:1, correctMsg:"Yes — saves time daily.", incorrectMsg:"Bookmarks just make navigation quicker." }
      ]}}
    ],

    // ============ DAY 5 ============
    explorers_5: [
      { id:"e5a", type:"flashcards", title:"Video Class Buttons", icon:"🔎", data:{ items:[
        { front:"📷 Camera", back:"Turns your video on so your teacher can see you." },
        { front:"🎤 Mic", back:"Turns your sound on or off. Mute it when you're not talking." },
        { front:"👋 Leave", back:"Tap this when class is over to leave the call." }
      ]}},
      { id:"e5b", type:"match", title:"Match the Button", icon:"🧩", data:{ pairs:[
        { left:"📷 Camera", right:"Lets your teacher see you" },
        { left:"🎤 Mic", right:"Lets others hear you" },
        { left:"👋 Leave", right:"Exit the video call" }
      ]}},
      { id:"e5c", type:"quiz", title:"Final Check", icon:"🏁", data:{ questions:[
        { prompt:"You're not talking right now. What should your mic button be?", choices:["🔇 Muted","🔊 Loud","Off camera"], correct:0, correctMsg:"Perfect! You're ready!", incorrectMsg:"Mute your mic when you're listening." }
      ]}}
    ],
    builders_5: [
      { id:"b5a", type:"flashcards", title:"Joining Video Class", icon:"🔎", data:{ items:[
        { front:"🔗 Joining a Call", back:"Click the link your teacher shares, then click 'Join'." },
        { front:"🎤 Mute Habit", back:"Stay muted unless you're speaking, so class stays easy to hear." },
        { front:"🙋 Classroom Rules", back:"Be on time, dress appropriately, and stay focused like in a real classroom." },
        { front:"🆘 Ask for Help", back:"Use chat or raise-hand if something isn't working — don't just give up." }
      ]}},
      { id:"b5b", type:"sequence", title:"Join Your First Online Class", icon:"🔢", data:{ steps:[
        "Check your camera and mic beforehand",
        "Click the class link 5 minutes early",
        "Click 'Join Now'",
        "Mute your microphone",
        "Turn on your camera",
        "Wait for your teacher to begin"
      ]}},
      { id:"b5c", type:"quiz", title:"Final Check", icon:"🏁", data:{ questions:[
        { prompt:"Your video won't turn on. What should you check FIRST?", choices:["That the camera isn't covered and permissions are allowed","That the whole computer is broken","Nothing, just leave the call"], correct:0, correctMsg:"Great troubleshooting!", incorrectMsg:"Start simple: check the lens cover and camera permissions." },
        { prompt:"When should you unmute yourself?", choices:["The whole class, always","Only when you need to speak","Never"], correct:1, correctMsg:"Exactly!", incorrectMsg:"Stay muted except when speaking." },
        { prompt:"You're stuck and can't figure something out. What should you do?", choices:["Give up quietly","Use chat or raise your hand to ask for help","Turn off your computer"], correct:1, correctMsg:"That's the way!", incorrectMsg:"Always ask for help — that's what teachers are there for." }
      ]}}
    ],
    innovators_5: [
      { id:"i5a", type:"flashcards", title:"Netiquette & Troubleshooting", icon:"🔎", data:{ items:[
        { front:"Netiquette", back:"Be on camera when possible, mute when not speaking, and use the chat respectfully." },
        { front:"Backgrounds & Privacy", back:"Use a blurred/virtual background if you'd rather not show your room." },
        { front:"Connection Issues", back:"If video freezes: check Wi-Fi, close extra tabs, or rejoin the call." },
        { front:"Who to Contact", back:"Know your school's tech-help contact or IT form for real problems." }
      ]}},
      { id:"i5b", type:"quiz", title:"Troubleshooting Tree: No Sound", icon:"🛠️", data:{ questions:[
        { prompt:"You join a call but can't hear anything. What's the SMARTEST first step?", choices:[
            "Immediately email tech support",
            "Check your device volume and that the correct speaker/mic is selected in the call settings",
            "Restart the entire computer without checking anything"
          ], correct:1, correctMsg:"Exactly — check the simple settings first.", incorrectMsg:"Always rule out simple settings (volume, device selection) before bigger fixes." },
        { prompt:"Video keeps freezing and lagging. What might help most?", choices:["Open more tabs to multitask", "Close unused tabs/apps and check your Wi-Fi signal","Turn your camera brightness up"], correct:1, correctMsg:"Right — fewer tabs and strong Wi-Fi both help.", incorrectMsg:"Freeing up bandwidth and closing tabs usually fixes lag." }
      ]}},
      { id:"i5c", type:"quiz", title:"Final Check — Week Review", icon:"🏁", data:{ questions:[
        { prompt:"What's the best habit for a smooth first day of online class?", choices:["Log in 5+ minutes early and test your camera/mic","Log in exactly when class starts, untested","Skip checking anything beforehand"], correct:0, correctMsg:"You're fully Launchpad-ready!", incorrectMsg:"Testing early prevents day-one surprises." },
        { prompt:"If something breaks on Day 1, what's your move?", choices:["Panic","Try the simple fix, then ask a teacher or tech support if it's still broken","Just miss class"], correct:1, correctMsg:"That's exactly the troubleshooting mindset!", incorrectMsg:"Troubleshoot simply first, then ask for help." }
      ]}}
    ]
  }
};
