function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
  slides.instructions1 = slide({
    name : "instructions1",
    start : function() {
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	
    	var inst1 = "";
//    	console.log(block_order);
    	if (exp.stims_block1[0].block == "ai") {
    		inst1 = inst1 + "First you'll answer questions about whether someone's response sounds natural in the conversation."
    	} else {
    		inst1 = inst1 + "First you'll answer questions about what a speaker is certain about."    		
    		}
    	$("#inst1").html(inst1);
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  }); 
     

  slides.block1 = slide({
    name : "block1",
    present : exp.stims_block1,
    start : function() {
      $(".err").hide();
    },
    present_handle : function(stim) {
    
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	    	    
      this.stim = stim;
      
    	this.stim.trial_start = Date.now();      
        $(".err").hide();  
        $("input[type=radio]").attr("checked", null);
          	 
       console.log(this.stim);    

	  var context = "<b>Person 1: </b>" + this.stim.context
      $(".utt1").html(context); 
      
      var target = "<b>Person 2: </b> " + this.stim.target
      $(".utt2").html(target); 
      
	  if (this.stim.block == "ai") {
	  		denial = "<b>Person 3: </b>"+ this.stim.denial+"<br><br>";
	  		question = "<i>Does Person 3's response sound natural in this conversation?</i>";
	  		rad1="No, not natural";
	  		rad3="Possibly not natural";
	  		rad5="Possibly natural";
	  		rad7="Yes, natural"
	  		
	  } else {
	  		question = "<i>Is Person 2 certain that "+this.stim.prompt+"?</i>";	  	
	  		denial="<br><br>";
	  		rad1 = "No, not certain";
	  		rad3 = "Possibly not certain";
	  		rad5="Possibly certain";
	  		rad7="Yes, certain"	
	  	}
	  $(".utt3").html(denial);	
	  $(".question").html(question);	  
	  $(".rad1").html(rad1);
	  $(".rad3").html(rad3);
	  $(".rad5").html(rad5);
	  $(".rad7").html(rad7);
    },

    button : function(){ 
    
    if($("input[name='radioresponse']:checked").val()) {
        this.response = $("input[name='radioresponse']:checked").val() 
        this.log_responses();
        _stream.apply(this);
        }
        
        else {
        $(".err").show();
        }
        },


    log_responses : function() {
      exp.data_trials.push({
      "block" : "block1",
      "question_type" : this.stim.block,     
   	  "slide_number_in_experiment" : exp.phase,
   	  "list": this.stim.list, 
   	  "itemID": this.stim.id,  
   	   "item": this.stim.idcontext,
   	   "name1": this.stim.name1,
   	  "name2" : this.stim.name2,
   	  "condition": this.stim.condition,	  
   	   "predicate": this.stim.predicate,
   	   "context": this.stim.context,
   	   "target": this.stim.target,
   	   "prompt": this.stim.prompt,
   	   "denial": this.stim.denial,
      "response": this.response,
      "rt" : Date.now() - this.stim.trial_start
      });
    }
  }
  ); 
  
  slides.instructions2 = slide({
    name : "instructions2",
    start : function() {
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	    	
    	var inst2 = "That was the first half! ";
    	if (exp.stims_block2[0].block == "ai") {
    		inst2 = inst2 + "Now you'll answer questions about whether someone's response sounds natural in the conversation."
    	} else {
    		inst2 = inst2 + "Now you'll answer questions about what a speaker is certain about."    		
    		}
    	$("#inst2").html(inst2);
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });   
  
  slides.block2 = slide({
    name : "block2",
    present : exp.stims_block2,
    start : function() {
      $(".err").hide();
    },
    present_handle : function(stim) {
    
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	    	    
      this.stim = stim;
      
    	this.stim.trial_start = Date.now();      
        $(".err").hide();  
        $("input[type=radio]").attr("checked", null);
          	 
       console.log(this.stim);    

	  var context = "<b>Person 1: </b>"+ this.stim.context
      $(".utt1").html(context); 
      
      var target = "<b>Person 2: </b>" + this.stim.target
      $(".utt2").html(target); 
      
	  if (this.stim.block == "ai") {
	  		denial = "<b>Person 3: </b>"+ this.stim.denial+"<br><br>";
	  		question = "<i>Does Person 3's response sound natural in this conversation?</i>";
	  		rad1="No, not natural";
	  		rad3="Possibly not natural";
	  		rad5="Possibly natural";
	  		rad7="Yes, natural"
	  		
	  } else {
	  		question = "<i>Is Person 2 certain that "+this.stim.prompt+"?</i>";	  	
	  		denial="<br><br>";
	  		rad1 = "No, not certain";
	  		rad3 = "Possibly not certain";
	  		rad5="Possibly certain";
	  		rad7="Yes, certain"	
	  	}
	  $(".utt3").html(denial);	
	  $(".question").html(question);	  
	  $(".rad1").html(rad1);
	  $(".rad3").html(rad3);
	  $(".rad5").html(rad5);
	  $(".rad7").html(rad7);
    },
    button : function(){ 
    
    if($("input[name='radioresponse']:checked").val()) {
        this.response = $("input[name='radioresponse']:checked").val() 
        this.log_responses();
        _stream.apply(this);
        }
        
        else {
            $(".err").show();
            }
        },
    log_responses : function() {
      exp.data_trials.push({
      "block" : "block2",
      "question_type" : this.stim.block,     
   	  "slide_number_in_experiment" : exp.phase,
   	  "list": this.stim.list, 
   	  "itemID": this.stim.id,  
   	  "item": this.stim.idcontext,
   	   "name1": this.stim.name1,
   	  "name2" : this.stim.name2,
   	  "condition": this.stim.condition,	  
   	   "predicate": this.stim.predicate,
   	   "context": this.stim.context,
   	   "target": this.stim.target,
   	   "prompt": this.stim.prompt,
   	   "denial": this.stim.denial,
      "response": this.response,
      "rt" : Date.now() - this.stim.trial_start
      });
    }
  });        
 

  slides.questionaire =  slide({
    name : "questionaire",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
//        enjoyment : $("#enjoyment").val(),
//        asses : $('input[name="assess"]:checked').val(),
        american : $('input[name="ame"]:checked').val(),
        age : $("#age").val(),
//        gender : $("#gender").val(),
//        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.finished = slide({
    name : "finished",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

 

  function makeStim(i) {
    //get item
    var item = exp.all_stims[i];
    console.log(item)
	//get a speaker
    //var name_data = names[i];
    //var name = name_data.name;
    //var gender = name_data.gender;
    
    // get content
    //var trigger_cont = trigger_contents[item.trigger];
    //var trigger = item.trigger;
    //var short_trigger = trigger;
    //if (trigger.indexOf("MC") != -1) {
    //	short_trigger = "MC";
    //	}
//	console.log("short_trigger: "+short_trigger);
//	console.log("trigger: "+trigger);
//    console.log("trigger_cont: "+trigger_cont);
//    console.log("utterance: "+contents[trigger_cont][short_trigger]);    
//    console.log(contents[trigger_cont]);    
    //var utterance = contents[trigger_cont][short_trigger];
    var question = item.prompt;
    console.log(question)
//    console.log(contents[trigger_cont]); 

    return {
    "list": item.list, 
    "id": item.id,
    "idcontext": item.idcontext,   
	  "name1": item.name1,
	  "name2": item.name2,
	  "name3": item.name3,
	    "condition": item.condition,	  
   	   "predicate": item.predicate,
	  "context": item.context,
	  "target": item.target,
	    "prompt": item.prompt, 
	  "denial": item.denial,
    }
  }
  
  
  exp.all_stims = _.shuffle(_.shuffle([list1,list2])[0])
  
  console.log(exp.all_stims.length)
  exp.stims_block1 = []
  exp.stims_block2 = []
   
  for (var i=0; i<exp.all_stims.length; i++) {
  	var stim = makeStim(i);
  	console.log(stim)
  	
	exp.stims_block1.push(jQuery.extend(true, {}, stim));
	exp.stims_block2.push(jQuery.extend(true, {}, stim));	
  }  
  
console.log(exp.stims_block1);
console.log(exp.stims_block2);   

	exp.stims_block1 = _.shuffle(exp.stims_block1);  
	exp.stims_block2 = _.shuffle(exp.stims_block2); 
	
// decide which block comes first
  var block_order = _.shuffle(["ai","projective"]);
  var block1type = block_order[0];
  var block2type = block_order[1];  
  console.log(block_order);
  console.log(block1type);  
  console.log(block2type);    

   for (k in exp.stims_block2) {
   		exp.stims_block2[k].block = block_order[1];   	
   	}
   	
   for (i in exp.stims_block1) {
   		exp.stims_block1[i].block = block_order[0];   	
   	}


console.log(exp.stims_block1);
console.log(exp.stims_block2);   	

//  exp.all_stims = [];
//  for (var i=0; i<items.length; i++) {
//    exp.all_stims.push(makeStim(i));
//  }
//
//	for (k in exp.all_stims) {
//		console.log(exp.all_stims[k].content)
//		}

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "instructions1", "block1", "instructions2", "block2", 'questionaire', 'finished'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

//  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
                    
   exp.nQs = 3 + 17 + 1 + 17 + 1; 
  $(".nQs").html(exp.nQs);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}