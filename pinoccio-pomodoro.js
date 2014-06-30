var pinoccio = require('pinoccio')
var prompt = require('prompt');
var http = require("http");
var pinoccioAPI = pinoccio('5ee258c3e8e01a89e62af72425ee7e29');
var troopId = 1;
var scoutId = 1;
var tasksCompleted = 0;


http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("hello world");
  response.end();
}).listen(8888);





runPrompt();


function setTimer(){

    console.log("Task Started. You have 25 minutes till your next break.")

    //after 25 minutes, change LED to green
    setTimeout(function(){var startTimer = 'led.green';
    pinoccioAPI.rest({url:'/v1/'+troopId+'/'+scoutId+'/command', method:'post', data:{command: startTimer}}, function(err, res){
    if (err) return console.error(err);
    }); }, 1500000);

    //LED is red while task is ongoing
    var endTimer = 'led.red';
    pinoccioAPI.rest({url:'/v1/'+troopId+'/'+scoutId+'/command', method:'post', data:{command: endTimer}}, function(err, res){
      if (err) return console.error(err);
      }); 
}

function runPrompt(){
  prompt.start();

  var property = {
    name: 'yesno',
    message: 'you have completed ' + tasksCompleted + ' tasks. Would you like to start another?',
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
    default: 'no'
  };

  prompt.get(property, function (err, result) {
  if(result.yesno == 'yes')
  {
    //if prompt answered yes, set a timer
    //then, after 25+ minutes, rerun prompt
    setTimer();
    tasksCompleted++;
    setTimeout(function(){runPrompt();}, 1500200);
    
  }
  else
  {
    //if user doesn't want to run another task, 
    //exit program
    process.exit();
  }
  });
}






