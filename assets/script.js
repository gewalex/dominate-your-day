var weatherFormEl = document.querySelector("#weather-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var citySearchInput = cityInputEl.value.trim();

    if (citySearch) {
        cityInputEl.value= "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);
}
var weatherApiKey = "861519be9cbc12d19fad9bfb53a63d3e";

var getCityWeather = function(city) {
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "&Appid=" + weatherApiKey + "&units=imperial";

    fetch(urlCurrent)
        .then(response => response.json()) 
        .then((data) => {
            console.log(data.results);
            displayWeather(weather.results)
        });
var temp, humidity, speed;

function displayWeather(data) {
    weather = data;
    
    for(var i = 0; i < 5; i ++){
        temp = weather[i].temp;
        humidity = weather[i].humidity;
        speed = weather[i].speed;
        console.log(weather[i].temp);

        createCard1(temp, humidity, speed);
    }
}

function createCard1(t, h, s){
    var card = document.createElement("div");
    card.innerHTML = `
    <h2>${t}</h2>
    <p><style${h}</p>
    <p><a href="${s}" target="_blank" class="text-xl text-red-500">READ MORE</a></p>
    `;

    document.getElementById('card-1').appendChild(card);

}

}



var news;
var newsApiKey = '6trXJd0Eo4FqEF8nrJx7s62Sd6sVlKys'
var queryURL = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key='+ newsApiKey


fetch(queryURL)
    .then(response => response.json())
    .then((data) => {
        console.log(data.results);
        displayNews(data.results);
    });

;

var title, abstract, articleUrl;

function displayNews(data) {
    news = data;
    
    for(var i = 0; i < 5; i ++){
        title = news[i].title;
        abstract = news[i].abstract;
        articleUrl = news[i].url;
        console.log(news[i].title);

        createCard(title, abstract, articleUrl);
    }
}

function createCard(t, a, u){
    var card = document.createElement("div");
    card.innerHTML = `
    <h4>${t}</h4>
    <p>${a}</p>
    <p><a href="${u}" class="text-xl text-red-500" target="_blank">READ MORE</a></p>
    `;

    document.getElementById('card-2').appendChild(card);

}

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var tasks = [];

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
 
  if (!taskNameInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  document.querySelector("input[name='task-name']").value = "";

  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput,);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      status: "to do",
    };

    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" + taskDataObj.name + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  switch (taskDataObj.status) {
    case "to do":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.append(listItemEl);
      break;
    case "in progress":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
      tasksInProgressEl.append(listItemEl);
      break;
    case "completed":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
      tasksCompletedEl.append(listItemEl);
      break;
    default:
      console.log("Something went wrong!");
  }
  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);
  saveTasks();
  taskIdCounter++;
};

var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn btn-dark delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function (taskName, taskType, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  formEl.querySelector("#save-task").textContent = "Add Task";
  saveTasks();
};

var taskButtonHandler = function (event) {
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function (event) {
  console.log(event.target.value);
  var taskId = event.target.getAttribute("data-task-id");

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};

var editTask = function (taskId) {
  console.log(taskId);
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);
  document.querySelector("input[name='task-name']").value = taskName;
  formEl.setAttribute("data-task-id", taskId);
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function (taskId) {
  console.log(taskId);
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
  var updatedTaskArr = [];
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  tasks = updatedTaskArr;
  saveTasks();
};

var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () {
  var savedTasks = localStorage.getItem("tasks");
  if (!savedTasks) {
    return false;
  }
  console.log("Saved tasks found!");
  savedTasks = JSON.parse(savedTasks);
  for (var i = 0; i < savedTasks.length; i++) {
    createTaskEl(savedTasks[i]);
  }
};
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();
//weather
var cityFormEl = document.querySelector('#city-form');
var nameInputEl = document.querySelector('#cityname');
var weatherDataContainerEl = document.querySelector('#weather-data-container');
var weatherDataSearchTerm = document.querySelector('#weather-data-search');

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = nameInputEl.value.trim();

  if (cityname) {
    getCityNameWeatherData(cityname);

    // clear old content
    weatherDataContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

var getCityNameWeatherData = function(city) {
  // format the api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=43307f36c133c1b4d80feb3644b2ab3e&units=imperial";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data); 
          displayRepos(data, city);
         
        });

      } else {
        alert('Error: City Not Found');
      }
    
    })
    .catch(function(error) {
      alert('Unable to connect to openweathermap');
    });
};

var displayRepos = function(weatherData, searchTerm) {
  //check if api returned any weather data
  if (weatherData === 0) {
    weatherDataContainerEl.textContent = 'No repositories found.';
    return;
  }

  weatherDataSearchTerm.textContent = searchTerm;
    // object returned from api for current weather
    var temperatureValue = weatherData['main']['temp'];
    var humidityValue= weatherData['main']['humidity'];
    var speedValue = weatherData['wind']['speed'];
    //var latitudeValue =  weatherData['coord']['lon'];
    //var longitudeValue = weatherData['coord']['lat'] ;
    //array object returned
    var icon =  weatherData['weather'][0]['icon'];
    //display current weather info as div block element
    var currentWeatherInfo = " <div> Temperature: " + temperatureValue +"&#8457;" + "</div>"  
                  + "<div> Wind Speed: " + speedValue + " MPH" + "</div>"
                  + "<div> Humidity: " + humidityValue + " %" + "</div>";
   
    // create a container for weather data
    var weatherDataEl = document.createElement('div');

    weatherDataEl.classList = 'list-item flex-row justify-space-between align-center';
    // create a span element to hold repository name
    var titleEl = document.createElement('span');
    //titleEl.textContent = repoNameTemp;
    titleEl.innerHTML = currentWeatherInfo;
    // append to container
    weatherDataEl.appendChild(titleEl);

   
    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';
    
      let imgIcon = document.createElement('img'); 
      imgIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
  
      statusEl.appendChild(imgIcon); 

    // append to container
    weatherDataEl.appendChild(statusEl);

    // append container to the dom
    weatherDataContainerEl.appendChild(weatherDataEl);
  };


// add event listeners to forms
cityFormEl.addEventListener('submit', formSubmitHandler);