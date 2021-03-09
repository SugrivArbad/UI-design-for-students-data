// 4th main button
$("button#modify_data").on("click",function(event){
	//event.preventDefault(); // prevent default behaviour of reloading page
	clearTimeout(timeout);
	$("div#div2").html("");
	$("div#div3").html("");
	$("div#div1").html("");
	selection_for_modification();
	
	function selection_for_modification(){
	
		//choice list
		var select = $("<select></select>").attr("id", "options_for_deletion");
	
		select.append($("<option></option>").attr("value", "add_dept").html("add_dept"));
		select.append($("<option></option>").attr("value", "add_stud").html("add_stud"));
		select.append($("<option></option>").attr("value", "del_dept").html("del_dept"));
		select.append($("<option></option>").attr("value", "del_stud").html("del_stud"));
	
		//choice list added to div#div1
		$("div#div1").html(select);
	
		//choice list clicked using button#modification_way
		$("div#div1").append($("<button></button>").attr("id","modification_way").html("modification_way"));
	
		$("button#modification_way").on("click",function(event){
				$("div#div3").html("");
				if($("select#options_for_deletion").val() == "add_dept")
					add_dept();
				if($("select#options_for_deletion").val() == "add_stud")
					add_stud();
				if($("select#options_for_deletion").val() == "del_dept")
					del_dept();
				if($("select#options_for_deletion").val() == "del_stud")
					del_stud();
		});
	}// selection_for_modification() 
});

function add_dept(){
	//dept_name = prompt("Enter dept name : ","");
	$("div#div2").html("<br> Enter dept name : ");
	$("div#div2").append($("<input id='usr_input' placeholder='Enter value'></input>"));

	var dept_name;
	$("div#div2").append($("<button id='usr_input'> </button>").html("accepting_dept"));

	$("button#usr_input").on("click", function(){
		dept_name = $("input#usr_input").val();
		accepting_dept();

		function accepting_dept(){
			if(dept_name==null){
				disply_dept_names();
				return;	
			}
			dept_already_present=false;
			for(dept in dept_students)
				if(dept == dept_name)
					dept_already_present=true;
		
			want_to_reenter=false;
		
			if(dept_already_present){
				want_to_reenter = confirm("'" + dept_name + "' already present \n would you like to Reenter?");
		
				if(want_to_reenter == true)
					add_dept();
			}
			else{
				dept_students[dept_name]=[];
				disply_dept_names();
			}
		}
	});
}

function add_stud(){
	//choose dept from list to add student
	var select = $("<select id='choose_dept'></select>");
	for(let dept in dept_students){
		select.append($("<option></option>").attr("value", dept).html(dept));
	}
	$("div#div2").html(select);
	$("div#div2").append($("<button id='add_student'></button>").html("add_student"));

	$("button#add_student").on("click",function(event){
		event.preventDefault();
		choose_dept = $("select#choose_dept").val();
		alert(typeof(choose_dept));
		for(dept in dept_students){
			if(choose_dept == dept){
				want_to_add_studs();
			}
		}
	});
}

function want_to_add_studs(){
	$("div#div3").html("<br> Enter no. of students : ");
	$("div#div3").append($("<input id='no_of_studs' placeholder='Enter value'></input>"));

	var no_of_studs;
	$("div#div3").append($("<button id='no_of_studs'> </button>").html("no_of_studs"));

	$("button#no_of_studs").on("click", function(event){
		event.preventDefault();
		no_of_studs = $("input#no_of_studs").val();
		stud_no=0;
		take_stud_name();
		function take_stud_name(){
			if(stud_no<no_of_studs){
				var stud_name = "stud"+(stud_no+1);
				$("div#div3").append($("<br><font id='stud_name'> </font>").html("stud "+(stud_no+1)+" : "));
				$("div#div3").append($("<input placeholder='Enter value'></input>").attr("id",stud_name));
		
				$("div#div3").append($("<button> </button>").attr("id",stud_name).html("stud_name"));
		
				var roll=0;
				alert(choose_dept);
				for(dept_name in dept_students)
					if(choose_dept==dept_name)
						for(roll_no in dept_students[dept_name])
							roll=roll_no;

				if(roll==0){
					for(dept_name in dept_students)
						for(roll_no in dept_students[dept_name]){
							max=Math.floor((roll_no-1+1)/1000);
							if(max>roll)
								roll=max;
						}
					roll=""+((roll+1)*1000);
				}
			
				$("button#"+stud_name).on("click", function(event){
					event.preventDefault();
					stud_name = $("input#"+stud_name).val();

					roll=""+(roll-1+2);
					//roll = String(Number(roll)+1);
					//roll=toString(parseInt(roll)+1);
					//alert(roll);
					dept_students[choose_dept][roll] = stud_name;
					stud_no++;
					take_stud_name();
				});

				/*
					$("font#stud_name").remove();
					$("input#stud_name").remove();
					$("button#stud_name").remove();
				*/
			}
			if(no_of_studs==stud_no)
				disply_dept_names();
		}
	});
}

function del_dept(){
	var select = $("<select id='choose_dept'></select>");
	for(let dept in dept_students){
		select.append($("<option></option>").attr("value", dept).html(dept));
	}
	$("div#div2").html(select);
	$("div#div2").append($("<button id='del_chosen_dept'></button>").html("del_chosen_dept"));

	$("button#del_chosen_dept").on("click",function(event){
		event.preventDefault();

		temp_dp={};
		for(dept in dept_students){
			if($("select#choose_dept").val() != dept){
				temp_dp[dept] = dept_students[dept];
			}
		}
		dept_students=temp_dp;
		disply_dept_names();
	});
}

function del_stud(){
	var select = $("<select id='choose_stud'></select>");
	for(let dept in dept_students){
		for(let stud_no in dept_students[dept])
			select.append($("<option></option>").attr("value", dept_students[dept][stud_no]).html(dept_students[dept][stud_no]));
	}
	$("div#div2").html(select);
	$("div#div2").append($("<button id='del_chosen_stud'></button>").html("del_chosen_stud"));

	$("button#del_chosen_stud").on("click",function(event){
		event.preventDefault();

		temp_dp={};
		for(dept in dept_students){
			temp_dp[dept]=[];
			tmp_no=0;
			for(let stud_no in dept_students[dept]){
				if($("select#choose_stud").val() != dept_students[dept][stud_no]){
					temp_dp[dept][tmp_no] = dept_students[dept][stud_no];
					alert(temp_dp[dept][tmp_no]);
					tmp_no++;
				}
			}
		}
		dept_students=temp_dp;
		disply_student_names();
	});
}
