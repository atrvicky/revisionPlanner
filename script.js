// the data structure for the list of pages
let pages = ["Login", "SignUp", "List", "Revision", "Game"];
let activePage = pages[0];

// user = {name: String, id: Number, highscore: Number, password: String]
let activeUser = undefined;

// an users list data structure to store the list of all signed up users
// [list of user objects]
let users = [
  {
    name: "sampleUser",
    password: "qwer@123",
    id: 0,
    notes: {
      Math: ["Sample Note for Math", "Sample two for Math"],
      Science: ["Science note One", "Science Note Two"],
      English: [],
      Language: ["Languages were the first set of man made boundaries"],
    },
  },
];

// the list of subjects [list of strings]
let subjects = ["Math", "Science", "English", "Language"];

// a map linking the subtopics to the main subjects and the
// revision status of each user
let topics = {
  Math: [
    {
      title: "Measurement and Geometry",
      completed: [0],
      revising: [],
      pending: [],
    },
    { title: "Statistics", completed: [0], revising: [], pending: [] },
    {
      title: "Number and Algebra",
      completed: [0],
      revising: [],
      pending: [],
    },
    { title: "Area and Volume", completed: [], revising: [], pending: [0] },
    {
      title: "Fractions and Decimals",
      completed: [],
      revising: [],
      pending: [0],
    },
    {
      title: "Percentage and Ratio",
      completed: [],
      revising: [],
      pending: [0],
    },
    {
      title: "Rate and Speed",
      completed: [],
      revising: [],
      pending: [0],
    },
    {
      title: "Past Papers",
      completed: [],
      revising: [],
      pending: [0],
    },
  ],
  Science: [
    {
      title: "Diversity",
      completed: [0],
      revising: [],
      pending: [],
    },
    {
      title: "Cycles",
      completed: [],
      revising: [],
      pending: [0],
    },
    { title: "Systems", completed: [], revising: [], pending: [0] },
    { title: "Energy", completed: [], revising: [], pending: [0] },
    { title: "Interactions", completed: [], revising: [], pending: [0] },
    { title: "Past Papers", completed: [], revising: [], pending: [0] },
  ],
  English: [
    { title: "Comprehension", completed: [], revising: [], pending: [0] },
    { title: "Composition Writing", completed: [], revising: [], pending: [0] },
    {
      title: "Listening Comprehension",
      completed: [],
      revising: [],
      pending: [0],
    },
    {
      title: "Past Papers",
      completed: [],
      revising: [],
      pending: [0],
    },
  ],
  Language: [
    { title: "Composision Writing", completed: [], revising: [], pending: [0] },
    { title: "Vocabulary", completed: [], revising: [], pending: [0] },
    {
      title: "Listening Comprehension",
      completed: [],
      revising: [],
      pending: [0],
    },
    {
      title: "Reading Comprehension",
      completed: [],
      revising: [],
      pending: [0],
    },
    { title: "Idioms and Proverbs", completed: [], revising: [], pending: [0] },
    { title: "Past Papers", completed: [], revising: [], pending: [0] },
  ],
};

let activeSub = subjects[0];
let activeIndex = 0;

let loginWrapper = document.getElementById("loginWrapper");
let signUpWrapper = document.getElementById("signUpWrapper");
let listWrapper = document.getElementById("listWrapper");
let revisionWrapper = document.getElementById("revisionWrapper");
let gameWrapper = document.getElementById("gameWrapper");
let usernameView = document.getElementById("username-view");

let toggleRoute = (newRoute) => {
  // if the passed newRoute is a valid route, take the user to that route,
  // if not, take them to the login screen
  activePage = pages.includes(newRoute) ? newRoute : "Login";
  pageRouter();
};

let pageRouter = () => {
  loginWrapper.style.display = "none";
  signUpWrapper.style.display = "none";
  listWrapper.style.display = "none";
  revisionWrapper.style.display = "none";
  gameWrapper.style.display = "none";

  if (activePage == pages[0]) {
    loginWrapper.style.display = "flex";
  } else if (activePage == pages[1]) {
    signUpWrapper.style.display = "flex";
  } else if (activePage == pages[2]) {
    listWrapper.style.display = "flex";
    changeSubject();
  } else if (activePage == pages[3]) {
    revisionWrapper.style.display = "flex";
  } else if (activePage == pages[4]) {
    gameWrapper.style.display = "flex";
  } else {
    loginWrapper.style.display = "flex";
  }
};

pageRouter();

let login = () => {
  let usernameField = document.getElementById("username-login");
  let passwordField = document.getElementById("password-login");
  let username = usernameField.value;
  let password = passwordField.value;

  let isValidCred = false;
  // Iterate through the users list and check if the input username and
  // password matches with any of the stored values
  for (
    let activeUserIndex = 0;
    activeUserIndex < users.length;
    activeUserIndex++
  ) {
    let u = users[activeUserIndex];
    if (u.name == username && u.password == password) {
      // match found: set the activeUser global variable and break out of the for loop
      isValidCred = true;
      activeUser = users[activeUserIndex];
      break;
    }
  }

  // if the verification passed, login the user, by directing them to the List page
  if (isValidCred) {
    toggleRoute("List");
    usernameView.innerText = `Hello ${username}!`;
  } else {
    // else display an alert message
    alert("User not logged in");
  }
};

let signup = () => {
  let usernameField = document.getElementById("username-signup");
  let passwordField = document.getElementById("password-signup");
  let username = usernameField.value;
  let password = passwordField.value;

  // username should be atlease 3 characters long
  if (username.trim().length < 3) {
    alert("Username must be atleast three characters long");
    return;
  }

  // password should be atleast three characters long
  if (password.trim().length < 3) {
    alert("Password must be atleast three characters long");
    return;
  }

  // iterate through the users list to find duplicates
  let duplicateAccount = false;
  users.forEach((u) => {
    if (u.name == username) {
      duplicateAccount = true;
    }
  });

  // if there is no duplicate, add the user to the users list
  // and redirect them to the login page
  if (duplicateAccount) {
    alert("Username exists!");
  } else {
    let newUser = {
      name: username,
      password: password,
      id: users.length,
      notes: {
        Math: [],
        Science: [],
        English: [],
        Language: [],
      },
    };
    users.push(newUser);

    // add all topics to pending list for the new user
    Object.keys(topics).forEach((t) => {
      let item = topics[t];
      item.forEach((i) => {
        i.pending.push(newUser.id);
      });
    });

    alert("Sign Up sucessful! Login to Continue");
    toggleRoute("Login");
  }
};

let logout = () => {
  activeUser = undefined;
  toggleRoute("Login");
};

// the section that prepares and downloads a text file
// containing the user data
let makeTextFile = function (text) {
  var data = new Blob([text], { type: "text/plain" });
  let textFile = undefined;
  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  return textFile;
};

let downloadData = () => {
  var link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("download", "data.txt");
  link.href = makeTextFile(JSON.stringify(users));
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    var event = new MouseEvent("click");
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
};

// this method can display the topic for the subject selected from the dropdown
let changeSubject = () => {
  let subjectSelector = document.getElementById("subjects");

  // step 1. Get the chosen topic of the user
  let topicsToDisplay = [];
  activeSub = subjects[0];
  switch (subjectSelector.value) {
    case subjects[0]:
      topicsToDisplay = topics.Math;
      break;
    case subjects[1]:
      topicsToDisplay = topics.Science;
      activeSub = subjects[1];
      break;
    case subjects[2]:
      topicsToDisplay = topics.English;
      activeSub = subjects[2];
      break;
    case subjects[3]:
      topicsToDisplay = topics.Language;
      activeSub = subjects[3];
      break;
    default:
      topicsToDisplay = topics.Math;
      break;
  }

  // step 2. get the div that displays the topics
  let listDiv = document.getElementById("topicList");
  // step 2.1. clear the list already visible in the div
  listDiv.innerHTML = "";

  // step 3. iterate through all the topics in the chosen subject
  for (let i = 0; i < topicsToDisplay.length; i++) {
    let topic = topicsToDisplay[i];
    // 3.1. clone the template used for the list items
    let topicTemplate = document
      .getElementById("topicTemplate")
      .cloneNode(true);
    // 3.2 set a new id for the div - based on the index of the topic in the list
    topicTemplate.id = `item-${i}`;

    // 3.3 set the topic title in the template
    topicTemplate.getElementsByClassName("title")[0].innerText = topic.title;

    // 3.4 add the complete, reset and revise buttons to the list
    let completeBtn =
      topicTemplate.getElementsByClassName("mark-complete-btn")[0];
    let resetBtn =
      topicTemplate.getElementsByClassName("reset-complete-btn")[0];
    let reviseBtn =
      topicTemplate.getElementsByClassName("begin-revision-btn")[0];

    // 3.5 also add some icons
    let completeIcon =
      topicTemplate.getElementsByClassName("completed-icon")[0];
    let pendingIcon = topicTemplate.getElementsByClassName("pending-icon")[0];
    let reviseIcon = topicTemplate.getElementsByClassName("revising-icon")[0];

    // 3.6 attach listeners to the buttons that call the respective functions with
    // the index of the topic as the argument
    completeBtn.addEventListener("click", (e) => {
      updateTopic(subjectSelector.value, i, activeUser.id, "c");
    });

    resetBtn.addEventListener("click", (e) => {
      updateTopic(subjectSelector.value, i, activeUser.id);
    });

    reviseBtn.addEventListener("click", (e) => {
      updateTopic(subjectSelector.value, i, activeUser.id, "r");
    });

    // 3.7 toggle the visibility of the button based on the status of revision for that topic
    if (topic.completed.includes(activeUser.id)) {
      completeBtn.style.display = "none";
      reviseBtn.style.display = "none";
      resetBtn.style.display = "block";

      completeIcon.style.display = "block";
      reviseIcon.style.display = "none";
      pendingIcon.style.display = "none";
    } else if (topic.revising.includes(activeUser.id)) {
      completeBtn.style.display = "block";
      reviseBtn.style.display = "none";
      resetBtn.style.display = "none";

      completeIcon.style.display = "none";
      reviseIcon.style.display = "block";
      pendingIcon.style.display = "none";
    } else if (topic.pending.includes(activeUser.id)) {
      completeBtn.style.display = "none";
      reviseBtn.style.display = "block";
      resetBtn.style.display = "none";

      completeIcon.style.display = "none";
      reviseIcon.style.display = "none";
      pendingIcon.style.display = "block";
    }

    listDiv.appendChild(topicTemplate);
  }
};

document.getElementById("show-notes-btn").addEventListener("click", () => {
  let homeNotesWrapper = document.getElementById("home-notes");
  if (homeNotesWrapper.style.display === "block") {
    document.getElementById("show-notes-btn").innerHTML = "View Notes";
    homeNotesWrapper.style.display = "none";
  } else {
    updateNotes(true);
    document.getElementById("show-notes-btn").innerHTML = "Hide Notes";
    homeNotesWrapper.style.display = "block";
  }
});

// update the topic based on the selected item in the dropdown
// this takes the following args:
// the name of the sub
// the index of the topic in the topics list
// the user ID of the active user (this could also be obtained from the activeUser obj)
// the new state to which to update the topic
let updateTopic = (sub, topicIndex, userID, state) => {
  let t = topics[sub];
  let ch = t[topicIndex];
  resetTopicState(sub, topicIndex, userID);

  if (state === "c") {
    displayQuote(false);
    ch.completed.push(userID);
  } else if (state === "r") {
    activeSub = sub;
    activeIndex = topicIndex;
    displayQuote(true);
    ch.revising.push(userID);
  } else {
    displayQuote(false);
    ch.pending.push(userID);
  }

  changeSubject();
};

// when reseting a topic, remove any current states and then set it to pending
let resetTopicState = (sub, topicIndex, userID) => {
  let t = topics[sub];
  let ch = t[topicIndex];

  for (let i = 0; i < ch.revising.length; i++) {
    if (ch.revising[i] === userID) {
      ch.revising.splice(i, 1);
    }
  }
  for (let i = 0; i < ch.completed.length; i++) {
    if (ch.completed[i] === userID) {
      ch.completed.splice(i, 1);
    }
  }
  for (let i = 0; i < ch.pending.length; i++) {
    if (ch.pending[i] === userID) {
      ch.pending.splice(i, 1);
    }
  }
  return ch;
};

/**
 * The Quotes control
 */
// quotes list
let quotesArr = [
  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.",
  "I am enough of an artist to draw freely upon my imagination. Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
  "If you can't explain it to a six year old, you don't understand it yourself.",
  "If you want your children to be intelligent, read them fairy tales. If you want them to be more intelligent, read them more fairy tales.",
  "Logic will get you from A to Z; imagination will get you everywhere.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Anyone who has never made a mistake has never tried anything new.",
  "I speak to everyone in the same way, whether he is the garbage man or the president of the university.",
  "When you are courting a nice girl an hour seems like a second. When you sit on a red-hot cinder a second seems like an hour. That's relativity.",
  "Never memorize something that you can look up.",
  "A clever person solves a problem. A wise person avoids it.",
  "Science without religion is lame, religion without science is blind.",
  "Reality is merely an illusion, albeit a very persistent one.",
  "If we knew what it was we were doing, it would not be called research, would it?",
];

// quotes bg list
let imagesArr = [
  "https://images.unsplash.com/photo-1460131548611-36aac9b6a901?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1494178270175-e96de2971df9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=780&q=80",
  "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1571125681108-52fcb1fdace2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1565197105570-5cafa3e0429d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1488903809927-48c9b4e43700?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=460&q=80",
];

// attach listeners to the buttons displayed in the quotes section
document.getElementById("quote-complete-btn").addEventListener("click", () => {
  let t = topics[activeSub];
  let ch = t[activeIndex];
  resetTopicState(activeSub, activeIndex, activeUser.id);
  ch.completed.push(activeUser.id);
  displayQuote(false);
  changeSubject();
});
document.getElementById("quote-reset-btn").addEventListener("click", () => {
  let t = topics[activeSub];
  let ch = t[activeIndex];
  resetTopicState(activeSub, activeIndex, activeUser.id);
  ch.pending.push(activeUser.id);
  displayQuote(false);
  changeSubject();
});

document.getElementById("note-save-btn").addEventListener("click", () => {
  users.forEach((u) => {
    if (u.id === activeUser.id) {
      let notesInput = document.getElementById("notes-input-area");
      let note = notesInput.value;
      if (!note || note.length < 4) {
        alert("Notes should be atleast 5 characters long.");
      } else {
        u.notes[activeSub].push(notesInput.value);
        updateNotes(false);
        notesInput.value = "";
      }
    }
  });
});

// toggle the visibility of the quote
let displayQuote = (showQuotes) => {
  if (showQuotes) {
    let max = quotesArr.length;
    let min = 1;
    let rndQ = Math.floor(Math.random() * (max - min) + min);
    document.getElementsByClassName("quote")[0].innerHTML = quotesArr[rndQ];

    max = imagesArr.length;
    let rndI = Math.floor(Math.random() * (max - min) + min);
    document.getElementById(
      "quote-wrapper"
    ).style.backgroundImage = `url('${imagesArr[rndI]}')`;
    document.getElementById("quote-wrapper").style.display = `flex`;
    document.getElementById("list-page-container").style.display = `none`;
    updateNotes(false);
  } else {
    document.getElementById("quote-wrapper").style.display = `none`;
    document.getElementById("list-page-container").style.display = `flex`;
  }
};

let updateNotes = (isHome) => {
  let quotesWrapper = isHome
    ? document.getElementById("home-notes")
    : document.getElementById("notes-list");
  quotesWrapper.innerHTML = "";
  let notesForSubject = activeUser.notes[activeSub];
  notesForSubject.forEach((s) => {
    let noteItem = document.createElement("li");
    noteItem.innerHTML = s;
    quotesWrapper.appendChild(noteItem);
  });
};

/**
 * The Simon Game
 */

let sequenceMade = [];
let sequenceUser = [];
let audio = [
  new Audio("./sounds/green.mp3"),
  new Audio("./sounds/blue.mp3"),
  new Audio("./sounds/red.mp3"),
  new Audio("./sounds/yellow.mp3"),
  new Audio("./sounds/wrong.mp3"),
];
let levelCounter = 0;
let level = 0;

let startGame = () => {
  level = 0;
  levelCounter = 0;
  sequenceMade = [];
  sequenceUser = [];
  toggleRoute("Game");
};

let endgame = () => {
  launchError(true);
  toggleRoute("List");
  $("body").css("background-color", "#fff");
};

//Press key to start
/* green = 0, red= 1, yellow =2, blue=3 */

$(document).on("keydown", function (e) {
  if (e.keyCode === 13) {
    nextSequence();
  }
});

//This generates a random number and pushes it to the sequenceMade.
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  sequenceMade.push(randomNumber);
  showSequence(sequenceMade[sequenceMade.length - 1]);
  changeLevel();
  sequenceUser = [];
}

//This displays the color and sound of each option
function showSequence(element) {
  switch (element) {
    case 0:
      audio[0].play();
      $("#green").addClass("dissapear");
      setTimeout(function () {
        $("#green").removeClass("dissapear");
      }, 250);
      break;
    case 1:
      audio[2].play();
      $("#red").addClass("dissapear");
      setTimeout(function () {
        $("#red").removeClass("dissapear");
      }, 250);
      break;
    case 2:
      audio[3].play();
      $("#yellow").addClass("dissapear");
      setTimeout(function () {
        $("#yellow").removeClass("dissapear");
      }, 250);
      break;
    case 3:
      audio[1].play();
      $("#blue").addClass("dissapear");
      setTimeout(function () {
        $("#blue").removeClass("dissapear");
      }, 250);
      break;
  }
}

function changeLevel() {
  levelCounter++;
  $("#level-title").text(`Level: ${levelCounter}`);
}

//This converts the clicks into numbers and pushes it to a new array.
$(".btn").click(function (e) {
  let userClicked = $(this).attr("id");
  switch (userClicked) {
    case "green":
      sequenceUser.push(0);
      showSequence(0);
      break;

    case "red":
      sequenceUser.push(1);
      showSequence(1);
      break;

    case "yellow":
      sequenceUser.push(2);
      showSequence(2);
      break;

    case "blue":
      sequenceUser.push(3);
      showSequence(3);
      break;
  }
  checkSequence(sequenceUser.length - 1);
});

//This checks if the sequences is correct so far
function checkSequence(indexOfArray) {
  if (sequenceUser[indexOfArray] === sequenceMade[indexOfArray]) {
    if (sequenceMade.length === sequenceUser.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    launchError(false);
  }
}
// Launches error sequence
function launchError(exit) {
  $("body").css("background-color", "red");
  $("h1").text("Game Over");
  if (!exit) {
    setTimeout(function () {
      $("h1").text("Press Enter Key to start");
      $("body").css("background-color", "#011F3F");
    }, 1500);
  }
  audio[4].play();
  levelCounter = 0;
  sequenceMade = [];
}
