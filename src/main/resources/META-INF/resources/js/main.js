
initializeWalkthroughPlayer = function(thePlayer, walkthrough) {

	var activeHighlighted = [];
	var lastUpdate = 0;
	console.log("initializing walkthrough with " + walkthrough[0]["media"] );

	thePlayer.attr("src", walkthrough[0]["media"]);
	
	thePlayer.bind("timeupdate", function() {
		// run max once per second to avoid firing twice.
		// events come in multiple times per second.
		// On slower environments, we might miss a beat - 
		// is that an issue?
		var player = this;
		var currentTime = player.currentTime;
		
		if(parseInt(lastUpdate) == parseInt(currentTime)) {
			return;
		}
		lastUpdate = parseInt(currentTime);

			
		$.each(walkthrough[0]["command"], function(index, command) {
			var cmd       = command["command"];
			var timeStart = parseInt(command["timeStart"]);
			var timeEnd   = parseInt(command["timeEnd"]);
			var payload   = command["payload"];
			
			if(currentTime >= timeStart) {
				if(cmd == "scroll" && currentTime < timeStart+1) {
					
					console.log("firing " + cmd + " on time " + timeStart + " to element " + payload + " " + timeEnd );
					$(payload).each(function(e){this.scrollIntoView({block: "center", inline: "nearest", behavior:"smooth"});});
					
				} else if(cmd == "highlight"  && currentTime <= timeEnd) {
				
					console.log("firing " + cmd + " on time " + timeStart + " until " + timeEnd + " to " + payload);
					$(payload).addClass("replay-highlight");

					command["command"] = "unhighlight";
					
				} else if(cmd == "click" && currentTime < timeStart+1) {
					
					console.log("firing " + cmd + " on time " + timeStart + " to " + payload + "(" + $(payload).count + " elements)");
					$(payload).each(function(){this.click();});
					
				} else if(cmd == "eval" && currentTime < timeStart+1) {
					
					console.log("firing " + cmd + " on time " + timeStart + " to " + payload);
					eval(payload);
					
				}  
			}
			// un-highlight also on rewind of the media track
			if((currentTime < timeStart || currentTime > timeEnd) && cmd == "unhighlight") {
				
				console.log("firing " + cmd + " on time " + timeEnd + " to " + payload);
				$(payload).removeClass("replay-highlight");
				command["command"] = "highlight";
			}
		});
	});
}

