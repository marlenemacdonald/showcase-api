$(document).ready(function(){

	populateList();
	$("#submitBtn").on('click', function(e){

		e.preventDefault();

		if($("#nameBox").val()){
			
		addToList($("#nameBox").val());
		}
	});


});

function addToList(value){
	console.log("adding to list");

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/todos",
		data: {
			name: value
		}
	}).done(function(data){
		populateList();

		$("#nameBox").val("");
	});

}




function populateList(){
	console.log("populate");

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/todos"
	}).done(function(data){

		var html = "";



		for(var t in data){
			var task = data[t];

			if(task.name){

				html += "<p id= '" + task._id + "'>" + task.name + " - Status: " + 
				(task.completed ? "completed": "incomplete <button id= '' class= completeBtn>Click when complete</button>" ) + "  " 
				+ "<button id= '' class= deleteBtn>Delete</button>" + "</p>";
				
				
			}
		}

		$('#container').html(html);

		$('.completeBtn').on('click', function(e){

			var elementClicked = e.target;
			var parent = $(elementClicked).parent('p');
			var id = $(parent).attr('id');

			console.log(id);


			$.ajax({
				type: "PUT",
				url: "http://localhost:3000/todos/" + id,
				data: {
					completed: true
				}
			}).done(function(){
				console.log("Task number" + id + "marked as complete");
				populateList();

			});
		
		});

		$('.deleteBtn').on('click', function(e){

			var elementClicked = e.target;
			var parent = $(elementClicked).parent('p');
			var id = $(parent).attr('id');

			console.log(id);


			$.ajax({
				type: "DELETE",
				url: "http://localhost:3000/todos/" + id,
			}).done(function(){
				//delete something
				console.log("Task number" + id + "removed");
				populateList();

			});
		
		});
	});
}

	