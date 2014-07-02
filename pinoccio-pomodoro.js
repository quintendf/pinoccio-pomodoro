var pinoccio = require('pinoccio')
var prompt = require('prompt');
var pinoccioAPI = pinoccio('5ee258c3e8e01a89e62af72425ee7e29');
var troopId = 1;
var scoutId = 1;
var tasksCompleted = 0;


runPrompt();

pinoccioAPI.sync().on('data',function(data){
  if(data.data.type === 'digital' && data.data.troop === '1' && data.data.scout === '2' && data.data.value.state[6] == 0){

    
    console.log("Button-press task started.")
    setTimer();
    
  }
});


function setTimer(){

    console.log("Task Started. You have 25 minutes till your next break.")
    //LED is red while task is ongoing
    var runningTimer = 'led.red';
    pinoccioAPI.rest({url:'/v1/'+troopId+'/'+scoutId+'/command', method:'post', data:{command: runningTimer}}, function(err, res){
      if (err) return console.error(err);
      }); 


    //after 25 minutes, change LED to green
    setTimeout(function(){var endedTimer = 'led.green';
    pinoccioAPI.rest({url:'/v1/'+troopId+'/'+scoutId+'/command', method:'post', data:{command: endedTimer}}, function(err, res){
    if (err) return console.error(err);
    });

    console.log("Task complete. ");
    tasksCompleted++;
    runPrompt();
    

     }, 1500000);


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
    //setTimeout(function(){runPrompt();}, 1500200);
    
  }
  else
  {
    //if user doesn't want to run another task, 
    //exit program
    process.exit();
  }
  });
}






