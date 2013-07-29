/*  
	ChronoBeard
	Author: Bisike N. Nnadi
*/

$(document).ready(function() {
    // Handler for .ready() called.

	
	/*
	===============================================
	=========================== APPLICATION GLOBALS	
	*/
	
	var win = $(window),
		body = $(document.body),
		container = $('#home'),	// the only element in index.html
		currentUser = {}
	;
    var id;
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	var loadApp = function(user_ID){

        $.get('templates/app.html', function(html){
             //clear first
            container.empty();

            $('.hidden').append(user_ID);

            $.ajax({
                url: 'xhr/get_user.php',
                data: {
                    userID: $('.hidden').val()
                },
                type: 'get',
                dataType: 'json',
                success: function(response){
                    console.log(response)
                    $('.user').append(response.user.user_n);

                }
            });

            getProjects();

            var h = $(html);

            var appHead = h.find('#template_app_header').html();
            var site = $.template('landing', appHead);
            container.append(site);

            var appView = h.find('#template_task_view').html();
            var site = $.template('landing', appView);
            container.append(site);

            var appFoot = h.find('#template_app_footer').html();
            var site = $.template('landing', appFoot);		// compile template
            $.render(site, 'landing');		// use template
            container.append(site);



            $('#datepicker').datepicker();
            $('#tabs').tabs();
            $('.accordion').accordion({header: "h3", collapsible: true, heightStyle: 'content'})
                           .sortable({axis: "y",
                                      handle: "h3",
                                      //connectWith: '.droppable',
                                      stop: function(event, ui){
                                          ui.item.children("h3").triggerHandler("focusout")
                                      }
                });

            // Need to fix the draggable sortable option that will color code the projects!!!!
            $('.group').draggable({
                appendTo: "body",
                helper: "clone"
            });

            $('.droppable').droppable({
                activeClass: "ui-state-default",
                //hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                drop: function( event, ui ) {
                    $(this).find(".placeholder").remove();
                    $( "<li></li>" ).ui.children.appendTo(this);
                    //$(this).css()
                }
            });

            $('.date').datepicker();


        });
    };

	var loadLanding = function(){
		$.get('templates/landing.html', function(htmlArg){
            container.empty();

			var h = $(htmlArg);

			var landingCodeh = h.find('#template_landing_header').html();
            var site = $.template('landing', landingCodeh);
            container.append(site);

            var landingCodeb = h.find('#template_landing_body').html();
            var site = $.template('landing', landingCodeb);
            container.append(site);

			var landingCodef = h.find('#template_landing_footer').html();
			var site = $.template('landing', landingCodef);		// compile template
			$.render(currentUser, 'landing');		// use template
			container.append(site);
		});
	};

    var loadSignUp = function(){
        $.get('templates/landing.html', function(html){
            console.log("loading");
            container.empty();

            var h = $(html);

            var landingCodeh = h.find('#template_landing_header').html();
            var site = $.template('landing', landingCodeh);
            container.append(site);

            var signUp = h.find('#signupform').html();
            var site = $.template('landing', signUp);
            container.append(site);

            var landingCodef = h.find('#template_landing_footer').html();
            var site = $.template('landing', landingCodef);		// compile template
            $.render(currentUser, 'landing');		// use template
            container.append(site);
        })
    };

    var showLogin = function(){
        console.log('Drop login');

         $('#drop_login').show('slide', {direction: 'down'});
    };

    var hideLogin = function(){
            $('#drop_login').hide('slide', {direction: 'up'});

    };

	var Login = function(){
        $.ajax({
            url: 'xhr/login.php',
            data: {
                     username: $('#login_user').val(),
                     password: $('#login_pass').val()
                   },
            type: 'post',
            dataType: 'json',
            success: function(response){
                console.log(response);
                if (response.error){
                    loadLanding()
                }else{
                    loadApp(response.id);
                }

            }
         });
    };

	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
			    if(response.error){
                    loadLanding();
                }else{
                    loadApp(response.id);
                }

			}
		});
	};

    var registerCheck = function(){
        $.ajax({
            url: 'xhr/register.php',
            data: {
                username: $('#user_name').val(),
                password: $('#pass').val(),
                email: $('#email').val()
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                console.log(response);
                if (response.error){
                    loadLanding()
                }else{
                   loadApp(response.id);
                }

            }
        });
    };

    var addProject = function(){
        $.ajax({
            url: 'xhr/new_project.php',
            data: {
                projectName: $('.pName').val(),
                status: $('.pStatus').val(),
                projectDescription: $('.projDescrip').val(),
                clientID: $('.clientID').val(),
                teamID: $('.teamID').val(),
                startDate: $('.stDate').val(),
                dueDate: $('.duDate').val()
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                console.log(response)
                if(response.error){
                    alert('Can not add Projects, try again');
                }else{
                    loadApp($('#user_id').val());
                }
            }
        });

    };

    var addTask = function(){
        $.ajax({
            url: 'xhr/new_task.php',
            data: {
                projectID: id,
                taskName: $('#taskName').val(),
                status: $('#taskStatus').val(),
                taskDescription: $('#taskDescrip').val(),
                priority: $('#priority').val(),
                taskCreator: $('#creator').val(),
                taskeeID: $('#taskeeID').val(),
                startDate: $('.stDate').val(),
                dueDate: $('.duDate').val(),
                updateDate: $('.upDate').val()
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                console.log(response)
                if(response.error){
                   alert('We can to add a task check for errors');
                }else{
                    console.log(id)
                    loadApp(id);
                }

            }
        });
    };
	
	var getProjects = function(){
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                console.log(response);

                if(response.error){
                    alert('Can not retrieve Projects, try again');
                }else{
                    var projects = response.projects;
                    var projectList = '';
                    //projectList = $.render(projects, 'langtemplate');;

                    for(var i = 0; i < projects.length; i++){
                        id = projects[i].id;
                        projectList +=
                            '<div class="group hidden projectList">' +
                                '<h3><b>' + projects[i].projectName + '</b> |' + projects[i].clientName +'|' +projects[i].status + '</h3>' +
                                '<div class="info">'+
                                '<div class="infoMain">'+
                                    '<p class="projID hidden">'+ projects[i].id + '</p>' +
                                    '<p>Description: '+ projects[i].projectDescription + '</p><br>' +
                                    '<p> POC: '+ projects[i].primaryContactName + '</p>' +
                                    '<p class="dateCreated"> Started Date: ' + projects[i].startDate +'</p>' +
                                    '<p class="dateCreated">Last Updated: '+ projects[i].updateDate +'</p>' +
                                    '<p class="dateCreated">Due Date: ' + projects[i].dueDate +'</p>' +
                                    '<a class="viewTask">View Tasks..</a> | <a class="updateProj">Update</a>' +
                                '</div>' +
                                '<br>' +
                                    '<form class="hidden projectUpdate">'+
                                        '<fieldset>'+
                                            '<label class="hidden projID">'+ id +'</label>'+
                                            '<label>'+ projects[i].projectName +'</label>'+
                                            '<input type="text" class="pName" placeholder="Project Name"><br>'+
                                            ' <label>'+ projects[i].status+'</label>'+
                                            '<input type="text" class="pStatus" placeholder="Status"><br>'+
                                            '<label>'+ projects[i].clientID + '</label>'+
                                            '<input type="text" class="clientID" placeholder="Client ID"><br>'+
                                            '<label>'+ projects[i].teamID + '</label>'+
                                            '<input type="text" class="teamID" placeholder="Team ID"><br>'+
                                            '<label>'+ projects[i].startDate + '</label>'+
                                            '<input type="text" class="date stDate" placeholder="Start Date"><br>'+
                                            '<label>'+ projects[i].dueDate + '</label>'+
                                            '<input type="text" class="date duDate" placeholder="Due Date"><br>'+
                                            '<label>'+ projects[i].updatedDate + '</label>'+
                                            '<input type="text" class="date upDate" placeholder="Updated Date" required><br>'+
                                            '<label>Project Description</label>'+
                                            '<textarea type="text" id="projDescrip">'+ projects[i].projectDescription + '</textarea>'+
                                        '</fieldset>'+
                                        '<a class="cancelUpdate">Cancel</a>  <button class="updateProject">Update</button>'+
                                    '</form>'+
                                '</div>'
                    }

                    $('.accordion').append(projectList);
                    $('.projectList').show();
                }
            }
        });
    };

    var getTasks = function(projID, projName){
        id = projID
        $.ajax({
            url:'xhr/get_tasks.php',
            data: {projectID: projID},
            type:'get',
            dataType: 'json',
            success: function(response){
                console.log(response)

                if(response.error){
                   //alert('You have no Task for this Project')
                    $('.taskError').dialog({
                        modal: true,
                        buttons: [{
                            text: 'Add Task',
                            click: function(){
                                $('#newTask').dialog({
                                    modal: true
                                });
                                $(this).dialog('close')
                            }
                        },
                            {
                                text: 'close',
                                click: function(){$(this).dialog('close')}
                            }]
                    })
                }else if(response.tasks == 0){
                    $('.taskError').dialog({
                        modal: true,
                        buttons: [{
                            text: 'Add Task',
                            click: function(){
                                $('#newTask').dialog({
                                    modal: true
                                });
                                $(this).dialog('close')
                            }
                        },
                            {
                                text: 'close',
                                click: function(){$(this).dialog('close')}
                            }]
                    })
                    }else{
                    $('#projName').append(projName);
                    $('#projectId').append(projID);
                    var tasks =  response.tasks;
                    console.log(tasks);
                    var  tList = '';
                    for(var i = 0; tasks.length; i++){
                        tList +=
                            '<div class="hidden taskList" title='+ projName+ ' Tasks">' +
                            '<ul>'+
                            '<li id="taskInfo"><a>' + tasks[i].priority + ' | '+ tasks[i].taskName + '</a></li>'+
                            '/ul>'+
                            '</div>'
                    }
                    $('.taskList').append(tList);
//                    $('.taskList').dialog({
//                        height: 300,
//                        buttons: [{
//                            text: 'Add Task',
//                            click: function(){
//                                $('#newTask').dialog({
//                                    modal: true
//                                });
//                            }
//                        },
//                            {
//                                text: 'close',
//                                click: function(){$(this).dialog('close')}
//                            }]
//
//                    });
                }
            }
        })
    };

    var updateProj = function(projID){
        $.ajax({
            url: 'xhr/update_project.php',
            data: {
                projectID: projID,
                projectName: $('.pName').val(),
                status: $('.pStatus').val(),
                projectDescription: $('.projDescrip').val(),
                clientID: $('.clientID').val(),
                teamID: $('.teamID').val(),
                startDate: $('.stDate').val(),
                dueDate: $('.duDate').val(),
                updatedDate: $('.upDate').val()
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                console.log(response)
                if(response.error){
                    alert('Can not update Projects, try again');
                }else{
                  loadApp($('#user_id').val())
                }
            }
        })
    };

    //var updateTasks = function(){};

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
        checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/

    /* Taking the user back to home page gobal escape*/
    $('.brand').live('click', function(e){
        e.preventDefault();
        console.log("home");

        init();

        return false;
    });

    /* Switch to the SignUp page from the cta buttons */
	$('.cta a').live('click', function(e){
        e.preventDefault();
        console.log("btn change");

        loadSignUp();

		return false;
	});

    /* Switch to the SignUp page from nav*/
    $('.newUser').live('click', function(e){
        console.log("login drop");
        e.preventDefault();
        loadSignUp();

		return false;
	});

    /* Displaying the login drop down */
    $('.login a').live('click', function(e){
        e.preventDefault();
        console.log("run");
        showLogin();

        return false;
    });

    /* Logging in the the user to the site*/
    $('#submit').live('click', function(e){
        e.preventDefault();
        console.log('Logging in');
        hideLogin();
        Login();
    });

    /* To exit out of the login*/
    $('#close a').live('click', function(e){
        e.preventDefault();
        console.log("disappear");
        hideLogin();

        return false;
    });

    /* Sending the new user data*/
    $('#signedUp a').live('click', function(e){
        e.preventDefault();
        console.log("run");

        registerCheck();
        return false;
    });

    /* For viewing the task*/
    $('.viewTask').live('click', function(e){
        e.preventDefault();
        console.log('new task');
        //console.log($(this));

        var next = $(this).parent('.infoMain');
        var next1 = next.find('.projID');
        var next2 = next.parent('.info').parent('.projectList');
        var next4 = next2.find('h3 > b');
        console.log(next4.html());

        getTasks(next1.html(),next4.html() );

        return false;

    });

    /* For adding a new project button that will send the info and refresh page*/
    $('#addingTask').live('click', function(e){
        e.preventDefault();
//        console.log("adding");
//        var next = $(this).parent('#newTask');
//        var next1 = next.find('#projectId');
//        console.log(next);
//        console.log(next1);
        addTask();
        $('#newTask').dialog( "close" );
        return false;
    });

    /* For updating the information on the Project details*/
    $('.updateProj').live('click', function(e){
        e.preventDefault();
        console.log('updating');
        // console.log(e);
        //console.log(e.currentTarget.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.classList[1]);
        // should hide the first and show the second div
        var next = $(this).parent('.infoMain');
        var update = next.siblings('.projectUpdate');
        console.log(update.html());
        $(next).hide('slide', {direction: 'up'}).fadeOut(1000);
        $(update).show('slide', {direction: 'down'}).fadeIn(1000);

      return false;
    });

    $('.cancelUpdate').live('click', function(e){
        e.preventDefault();
        console.log('cancel');
        // should hide the first and show the second div
        var next = $(this).parent('.projectUpdate');
        var update = next.siblings('.infoMain');
        console.log(update.html());
        $(update).show('slide', {direction: 'up'}).fadeIn(1000);
        $(next).hide('slide', {direction: 'down'}).fadeOut(1000);

        return false;
    });

    /* Sending the updated info and refreshing page */
    $('.updateProject').live('click', function(e){
        e.preventDefault();
        console.log('updating...');


        var next = $(this).parent('.projectUpdate');
        var next1 = next.find('.projID');
        console.log(next1.html());
        updateProj(next1.html());
        loadApp($('#user_id').val());

        return false;
    });

    /* For adding a new project, the modal will show*/
    $('#addNew').live('click', function(e){
        e.preventDefault();
        console.log("add");
         $('#newProject').dialog({
             modal: true,
             height: 260

         });
        return false;
    });

    /* For adding a new project button that will send the info and refresh page*/
    $('#addingProject').live('click', function(e){
        e.preventDefault();
        console.log("adding");
        addProject();
        $('#newProject').dialog( "close" );
        return false;
    });

    /* When the user logs out*/
    $('#logout a').live('click', function(e){
        e.preventDefault();
        console.log("out");
        $.ajax({
            url: 'xhr/logout.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                console.log(response);
                if(response){
                    loadLanding();
                }
            }
        });

        return false;
    });


//    win.on('submit', '#user-reg-form', function(){
//
//		return false;
//	});
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/

});

	




