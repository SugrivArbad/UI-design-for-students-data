var timeout;
$("button#name").on("click",function(event){
//		event.preventDefault(); // prevent default behaviour of reloading page
		clearTimeout(timeout);
		$("div#div1").html("");
		$("div#div2").html("");
		$("div#div3").html("");
		disply_student_names();
});

$("button#dept").on("click",function(event){
		//event.preventDefault();
		clearTimeout(timeout);
		$("div#div1").html("");
		$("div#div2").html("");
		$("div#div3").html("");
		disply_dept_names();
});

$("button#get_depts").on("click",function(event){
		//event.preventDefault();
		clearTimeout(timeout);
		$("div#div1").html("");
		$("div#div2").html("");
		$("div#div3").html("");
		genearte_dept_list()
});

// using pagination
function disply_student_names(){

	$("div#div2").html($("<table id='display'></table>"));

	total_records=0;
	for(dept in dept_students){
		for(stud in dept_students[dept]){
			total_records++;
		}       
	}

	var showPrevButton=0, showNextButton=0, index_for_stud=0, count=0;
	var slideShow=1;
	pagination_for_studs();

	function pagination_for_studs(){

//		console.log("start",count,index_for_stud,showPrevButton,showNextButton);

		ten_records="not got";
		count=0;

		$("table#display").html($("<tr><th> Roll_no </th><th> Students name </th></tr>"));
		for(dept in dept_students){
			for(stud in dept_students[dept]){
				if(count>=index_for_stud && count<index_for_stud+10){
					tr = $("<tr></tr>");
					tr.append($("<td></td>").html(stud));
					tr.append($("<td></td>").html(dept_students[dept][stud]));

					$("table#display").append(tr);
					showNextButton++;
				}
				count++;
				if(count==index_for_stud+10){   //once ten_records got, should not search ahead
					ten_records="got";
					break;
				}
			}       
			if(ten_records=="got")
				break;
		}

		if(slideShow){
			timeout=setTimeout(function(){
				if(showNextButton<total_records && showNextButton>0){
					index_for_stud+=10;
					showPrevButton+=10;
					pagination_for_studs();
				}
				else{
					index_for_stud=0;	
					showPrevButton=0;
					showNextButton=0;
					pagination_for_studs();
				}

			}, 1500);
		}

		if(showPrevButton>=10 && showNextButton<total_records && showNextButton>0){
			$("div#div3").html("");
			$("div#div3").append($("<button id='prev'></button>").html("prev"));
			$("div#div3").append($("<font color='khaki'></font>").html("-----------------------"));
			$("div#div3").append($("<button id='next'></button>").html("next"));
			$("button#prev").on("click", function(){
				slideShow=0;
				index_for_stud-=10;
				showNextButton-=(count-index_for_stud);
				showPrevButton-=10;
				pagination_for_studs();
			});
			$("button#next").on("click", function(){
				slideShow=0;
				index_for_stud+=10;
				showPrevButton+=10;
				pagination_for_studs();
			});
		}
		else if(showPrevButton>=10){
			$("div#div3").html("");
			$("div#div3").append($("<button id='prev'></button>").html("prev"));
			$("button#prev").on("click", function(){
				slideShow=0;
				index_for_stud-=10;
				showNextButton-=(count-index_for_stud);
				showPrevButton-=10;
				pagination_for_studs();
			});
		}
		else if(showNextButton<total_records && showNextButton>0){
			$("div#div3").html("");
			$("div#div3").append($("<font color='khaki'></font>").html("----------------------------------"));
			$("div#div3").append($("<button id='next'></button>").html("next"));
			$("button#next").on("click", function(){
				slideShow=0;
				index_for_stud+=10;
				showPrevButton+=10;
				pagination_for_studs();
			});
		}
	}
} // disply_student_names()
		
function disply_dept_names(){

	$("div#div2").html($("<table id='display'></table>"));

	total_records=0;
	for(dept in dept_students){
		total_records++;
	}

	var showPrevButton=0, showNextButton=0, index_for_stud=0, count=0;
	var slideShow=1;
	pagination_for_depts();

	function pagination_for_depts(){

		count=0;

		console.log(showNextButton, showPrevButton, total_records);
		
		$("table#display").html($("<tr><th> Department name </th></tr>"));
		for(dept in dept_students){
			if(count>=index_for_stud && count<index_for_stud+10){
				tr = $("<tr></tr>");
				tr.append($("<td></td>").html(dept));

				$("table#display").append(tr);
				showNextButton++;
			}
			count++;
			if(count==index_for_stud+10){   //once ten_records got, should not search ahead
				break;
			}
		}

		if(slideShow){
			clearTimeout=setTimeout(function(){
				if(showNextButton<total_records && showNextButton>0){
					index_for_stud+=10;
					showPrevButton+=10;
					pagination_for_depts();
				}
				else{
					index_for_stud=0;	
					showPrevButton=0;
					showNextButton=0;
					pagination_for_depts();
				}

			}, 1500);
		}
		
		if(showPrevButton>=10 && showNextButton<total_records && showNextButton>0){
			$("div#div3").html("");
			$("div#div3").append($("<button id='prev'></button>").html("prev"));
			$("div#div3").append($("<font color='khaki'></font>").html("-----------------------"));
			$("div#div3").append($("<button id='next'></button>").html("next"));
			$("button#prev").on("click", function(){
				slideShow=0;
				index_for_stud-=10;
				showNextButton-=(count-index_for_stud);
				showPrevButton-=10;
				pagination_for_depts();
			});
			$("button#next").on("click", function(){
				slideShow=0;
				index_for_stud+=10;
				showPrevButton+=10;
				pagination_for_depts();
			});
		}
		else if(showPrevButton>=10){
			$("div#div3").html("");
			$("div#div3").append($("<button id='prev'></button>").html("prev"));
			$("button#prev").on("click", function(){
				slideShow=0;
				index_for_stud-=10;
				showNextButton-=(count-index_for_stud);
				showPrevButton-=10;
				pagination_for_depts();
			});
		}
		else if(showNextButton<total_records && showNextButton>0){
			$("div#div3").html("");
			$("div#div3").append($("<font color='khaki'></font>").html("----------------------------------"));
			$("div#div3").append($("<button id='next'></button>").html("next"));
			$("button#next").on("click", function(){
				slideShow=0;
				index_for_stud+=10;
				showPrevButton+=10;
				pagination_for_depts();
			});
		}
	}
} // disply_student_names()
		
function genearte_dept_list(){
	var select = $("<select id='dept_wise_stud'></select>");
	for(let dept in dept_students){
		select.append($("<option></option>").attr("value", dept).html(dept));
	}
	$("div#div1").html(select);
	$("div#div1").append($("<button id='show_dept_stud_list'></button>").html("stud list"));

	$("button#show_dept_stud_list").on("click",function(event){
			event.preventDefault();
			//$("div#div2").append($("<br>"));
			display_dept_wise_stud();
	});

	function display_dept_wise_stud(){
		$("div#div2").html($("<table id='display'></table>"));
		total_records=0;
		for(dept in dept_students){
			if($("select#dept_wise_stud").val() == dept){         //will cause problem if id is same
				for(stud in dept_students[dept]){
					total_records++;
				}       
			}
		}
	
		var showPrevButton=0, showNextButton=0, index_for_stud=0, count=0;
		var slideShow=1;
		pagination_for_studs();
	
		function pagination_for_studs(){
	
			ten_records="not got";
			count=0;
	
			$("table#display").html($("<tr><th> Roll_no </th><th> Students name </th></tr>"));
			for(dept in dept_students){
				if($("select#dept_wise_stud").val() == dept){         //will cause problem if id is same
					for(stud in dept_students[dept]){
						if(count>=index_for_stud && count<index_for_stud+10){
							tr = $("<tr></tr>");
							tr.append($("<td></td>").html(stud));
							tr.append($("<td></td>").html(dept_students[dept][stud]));

							$("table#display").append(tr);
							showNextButton++;
						}
						count++;
						if(count==index_for_stud+10){   //once ten_records got, should not search ahead
							ten_records="got";
							break;
						}
					}
					if(ten_records=="got")
						break;
				}
			}

			if(slideShow){
				clearTimeout=setTimeout(function(){
					if(showNextButton<total_records && showNextButton>0){
						index_for_stud+=10;
						showPrevButton+=10;
						pagination_for_studs();
					}
					else{
						index_for_stud=0;	
						showPrevButton=0;
						showNextButton=0;
						pagination_for_studs();
					}
	
				}, 1500);
			}

			if(showPrevButton>=10 && showNextButton<total_records && showNextButton>0){
				$("div#div3").html("");
				$("div#div3").append($("<button id='prev'></button>").html("prev"));
				$("div#div3").append($("<font color='khaki'></font>").html("-----------------------"));
				$("div#div3").append($("<button id='next'></button>").html("next"));
				$("button#prev").on("click", function(){
					slideShow=0;
					index_for_stud-=10;
					showNextButton-=(count-index_for_stud);
					showPrevButton-=10;
					pagination_for_studs();
				});
				$("button#next").on("click", function(){
					slideShow=0;
					index_for_stud+=10;
					showPrevButton+=10;
					pagination_for_studs();
				});
			}
			else if(showPrevButton>=10){
				$("div#div3").html("");
				$("div#div3").append($("<button id='prev'></button>").html("prev"));
				$("button#prev").on("click", function(){
					slideShow=0;
					index_for_stud-=10;
					showNextButton-=(count-index_for_stud);
					showPrevButton-=10;
					pagination_for_studs();
				});
			}
			else if(showNextButton<total_records && showNextButton>0){
				$("div#div3").html("");
				$("div#div3").append($("<font color='khaki'></font>").html("----------------------------------"));
				$("div#div3").append($("<button id='next'></button>").html("next"));
				$("button#next").on("click", function(){
					slideShow=0;
					index_for_stud+=10;
					showPrevButton+=10;
					pagination_for_studs();
				});
			}
		}
	} // display_dept_wise_stud()
}// genearte_dept_list() 
