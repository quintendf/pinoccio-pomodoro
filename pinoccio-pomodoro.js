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
      setTimeout(function(){var startTimer = 'led.green';
    pinoccioAPI.rest({url:'/v1/'+troopId+'/'+scoutId+'/command', method:'post', data:{command: startTimer}}, function(err, res){
    if (err) return console.error(err);
    }); }, 1500000);

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
    //
    // Log the results.
    //
  if(result.yesno == 'yes')
  {
    setTimer();
    tasksCompleted++;
    setTimeout(function(){runPrompt();}, 1500200);
    
  }
  else
  {
    process.exit();
  }
    
  });
}






