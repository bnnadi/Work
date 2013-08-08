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
            getClient();

            var h = $(html);

            var appHead = h.find('#template_app_header').html();
            var siteHead = $.template('appHead', appHead);
            var headRender = $.render(siteHead, 'appHead')
            container.append(headRender);

            var appView = h.find('#template_app_view').html();
            var siteView = $.template('mainView', appView);
            var bodyRender = $.render(siteView, 'mainView');		// use template
            container.append(bodyRender);

            var appFoot = h.find('#template_app_footer').html();
            var siteFoot = $.template('appFoot', appFoot);		// compile template
            var footRender = $.render(siteFoot, 'appFoot');		// use template
            container.append(footRender);



            $('#datepicker').datepicker();
            $('#tabs').tabs();

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

         $('#drop_login').show('slide', {direction: 'up'});
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
                projectName: $('#pName').val(),
                status: $('#pStatus').val(),
                projectDescription: $('#projDescrip').val(),
                clientID: $('#clientID').val(),
                teamID: $('#teamID').val(),
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

    var addTask = function(id){
        $.ajax({
            url: 'xhr/new_task.php',
            data: {
                projectID: id,
                taskName: $('.taskName').val(),
                status: $('.taskStatus').val(),
                taskDescription: $('.taskDescrip').val(),
                priority: $('.priority').val(),
                taskCreator: $('.creator').val(),
                taskeeID: $('.taskeeID').val(),
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
                    loadApp($('#user_id').val());

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
                    $('.accordion').empty();
                    var projects = response.projects;
                    var projectList = '';

                    $.get('templates/app.html', function(html){

                        var accord = $(html).find('#template_project_link').html();
                        $.template('accord', accord);
                        projectList = $.render(projects, 'accord');
                        $('.accordion').append(projectList);
                         // create an unique id for each project in the .viewTask <div> so each project can only show it's on Tasks
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

                        $('.date').datepicker();
                    })
                }
            }
        });
    };

    var getTasks = function(projID, location){
        id = projID;
           console.log(location)
        $.get('templates/app.html', function(html)
        {

            $('.taskList > ul').empty();
                $.ajax({
                    url:'xhr/get_tasks.php',
                    data: {projectID: projID},
                    type:'get',
                    dataType: 'json',
                    success: function(response){
                        console.log(response);
                        //$('.accordion').empty();
                       var task = response.tasks

                            if(task.error || task.length == 0){
                                   //alert('You have no Task for this Project')
                                $('.taskError').show();
                                $(location).show('slide', {direction: 'down'}).fadeIn(1000);
                            }else
                            {
//                                $('#projName').append(projName);
//                                $('#projectId').append(projID);

                                console.log(task);
                                var  tList = '';
                                for(var i = 0; i < task.length; i++){
                                    tList +=
                                        '<li id="taskInfo"><a>' + task[i].priority + ' | <i>'+ task[i].taskName + '</i> | '+ task[i].assignedTo +
                                            '</a><a class="deleteTask">x</a><span class="hidden">' + task[i].projectID + '</span>'+
                                            '<span class="hidden uniqueID">' + task[i].id + '</span></li>'

                                }
                                $('.taskList > ul').append(tList);
                                $('.taskError').hide();
                                $('.taskList').show();
                                $(location).show('slide', {direction: 'down'}).fadeIn(1000);

                            }




                    }
                })
        });
    };

    var getClient = function(){
        console.log('clients?');

        $.ajax({
            url: 'xhr/get_clients.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                console.log(response)
                var clients = response;
                var cList = '';

                $.get('templates/app.html', function(html){
                    var listClient = $(html).find('#template_clients').html();
                    $.template('client', listClient);
                    cList = $.render(clients, 'client');
                    $('.clientStuff').append(cList);

                    if(clients.error){
                        //alert('You do not have clients right now, Add some!');
                        $('#clientRequest').show();
                    }else{
                        var listC = ''
                        for(var i = 0; i < clients.clients.length; i++){
                            $('#listyC').empty();
                        listC +=
                            '<p class="hidden cListy"><a class="clientInfo">ClientID: '+ clients.clients[i].id+' | Client Name: '+ clients.clients[i].clientName+'</a></p><br>'
                        }
                        $('#listyC').append(listC);
                        $('.cListy').show();

                    };
                });
            }
        });


    };

    var viewTasks = function(projID, tName, location){
        $(location).empty();
        $.ajax({
            url:'xhr/get_tasks.php',
            data: {projectID: projID},
            type:'get',
            dataType: 'json',
            success: function(response){
                console.log(response)

                if(response.error){
                    //alert('You can not access the Task for this Project');
                }else{
                    var tasks =  response.tasks;
                    var tView = "";
                    for(var i = 0; i < tasks.length; i++)
                    {
                        if(tName === tasks[i].taskName)
                        {
                            console.log('task name: '+tasks[i].taskName);
                            tView +=  '<form> <fieldset>' +
                                    '<label class="projectId">' + tasks[i].projectID +'</label><br> ' +
                                   ' <label class="clientName">' + tasks[i].clientName+'</label> ' +
                                   ' <label class="clientId">'+ tasks[i].clientID+'</label><br> ' +
                                    '<label>Task Status: ' +tasks[i].status+'</label> ' +
                                    '<select class="hidden comboBox">' +
                                        '<option value="urgent">Urgent</option> ' +
                                        '<option value="active">Active</option> ' +
                                        '<option value="delayed">Delayed</option> ' +
                                        '<option value="finished">Finished</option></select><br> ' +
                                    '<label>Task Name:' + tasks[i].taskName+'</label> ' +
                                    '<input type="text" class="hidden taskName" required><br> ' +
                                    '<label>Task Creator:' + tasks[i].taskCreator+'</label> ' +
                                    '<input type="text" class="hidden creator"><br>' +
                                    '<label>Taskee ID:' + tasks[i].taskeeID+'</label> ' +
                                    '<input type="text" class="hidden taskeeID"><br> ' +
                                    '<label>Task Assigned To: ' +tasks[i].assignedTo+'</label> ' +
                                    '<input type="text" class="hidden assigned"><br> ' +
                                    '<label>Priority: ' +tasks[i].priority+'</label> ' +
                                    '<input type="text" class="hidden priority"><br> ' +
                                    '<label>Start Date: ' +tasks[i].startDate+'</label>' +
                                    '<input type="text" class="hidden date stDate"><br>' +
                                    '<label>Due Date: ' +tasks[i].dueDate+'</label>' +
                                    '<input type="text" class="hidden date duDate"><br> ' +
                                    '<label>Task Description: </label><p>' +tasks[i].taskDescription+'</p>' +
                                    '<textarea class="hidden taskDescrip">' +tasks[i].taskDescription+'</textarea> ' +
                                    '<span class="hidden id">Task id: ' +tasks[i].id+'</span>' +
                                    '<label class="hidden">Updated Date: ' +tasks[i].updatedDate+'</label>' +
                                    '<input type="text" class="hidden date duDate"><br> ' +
                               '</fieldset></form>'
                        };

                    };
                    console.log(location);
                      $(location).append(tView);

                           $(location).dialog({
                               modal: true,
                               height: 300,
                               width: 'content',
                               buttons: [{
                                   text: 'close',
                                    click: function(){
                                        $(this).dialog('close');
                                    }
                                },
                                    {
                                   text: 'Update Task',
                                     click: function(){
                                        //$('.taskView').empty();
                                         console.log($(this));
                                         var unhide = $(this).children();
                                         var unhide2 = unhide.children();
                                         var unhide3 = unhide2.children();
                                         console.log(unhide3.length);

                                         for(var i = 0; i < (unhide3.length -1); i++){
                                             $(unhide3).show('bounce');
                                         }
                                         // hide the button
                                        }
                                    },
                                   {
                                       text: 'UPDATE',
                                       click: function(){
                                           console.log($('.id').html())
                                           updateTasks($('.id').val());

                                       }
                                   }]

                            }).show();
                    $('.date').datepicker();

                }
            }
        })
    };

    var viewClient = function(clientID){
        $.ajax({
            url: 'xhr/get_clients.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                console.log(response)
                var client = response;

                $.get('templates/app.html', function(html){

                    if(client.error){
                        alert('HAhaHahA you got no info!');
                    }else{
                        var listC = ''
                        for(var i = 0;i <client.clients.length; i++ ){
                            if(client.clients[i].id === clientID){
                                $('#infoClient').append(client.client[i]);
                            }
                        };
//                                $('#infoClient').empty();
//                                listC +=
//                                    '<label class="clientId">'+thisGuy.id+'</label><br>'+
//                                    '<label class="clientName">'+thisGuy.clientName+'</label>'+
//                                    '<label>Email: '+thisGuy.primaryContact+'</label>'+
//                                    '<input type="text" class="hidden primary" required><br>'+
//                                    '<label>Website: '+thisGuy.phone+'</label>'+
//                                    '<input type="text" class="hidden phone"><br>'+
//                                    '<label>Email: '+thisGuy.email+'</label>'+
//                                    '<input type="text" class="hidden email" required><br>'+
//                                    '<label>Website: '+thisGuy.website+'</label>'+
//                                    '<input type="text" class="hidden website"><br>'+
//                                    '<label>City: '+thisGuy.city+'</label>'+
//                                    '<input type="text" class="hidden creator"><br> '+
//                                    '<label>State: '+thisGuy.state+'</label>'+
//                                    '<input type="text" class="hidden taskeeID"><br>'+
//                                    '<label>Zip code: '+thisGuy.zipcode+'</label>'+
//                                    '<input type="text" class="hidden assigned"><br>'+
//                                    '<a class="closeView"> Close</a> | <a id="showInput">Make changes</a>  <button id="updateClient">Update</button>'
//
//
//                            $('#infoClient').append(listC);
                            $('#infoClient').show();


                    }
                });
            }
        });
    }

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

    var updateTasks = function(taskId){

        $.ajax({
            url: 'xhr/update_task.php',
            data: {
                taskID: taskId,
                taskName: $('.taskName').val(),
                taskDescription: $('.taskDescrip').val(),
                taskeeID: $('.taskeeID').val(),
                status: $('.taskStatus').val(),
                priority: $('.priority').val(),
                startDate: $('.stDate').val(),
                dueDate: $('.duDate').val() ,
                updatedDate: $('.upDate').val()
            },
            dataType: 'json',
            success: function(response){
                if(response){
                    $('.taskView').empty();
                    $('.taskView').dialog('close');
                }else{
                    alert('You can not update the Task for this Project');
                }
            }
        })

    };

    var newClient = function(clientName){
        $.ajax({
            url: 'xhr/new_client.php',
            data: {
                    clientName: clientName,
                    primaryContact: Number($('#primaryCon'.val())), //Must be a Number
                    phone: $('#cPhone').val(),
                    address: $('#cAddress').val(),
                    city: $('#cCity').val(),
                    state: $('#cState').val(),
                    zipcode: $('#czipcode').val(),
                    website: $('#cwebsite').val(),
                    email:   $('#cEmail').val()

            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                   alert('Could not add new Client' + response.error)
                }else{
                   loadApp($('#user_id').val());
                }
            }
        })
    };

    var updateClient = function(clientID){
        $.ajax({
            url: 'xhr/update_client.php',
            data: {
                clientID: clientID
//                primaryContact: , //Must be a Number
//                clientName: ,
//                phone: ,
//                address: ,
//                city: ,
//                state: ,
//                zipcode: ,
//                website: ,
//                email:
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response){

                }else{

                }
            }
        })
    };

    var updateUser = function(){

        if($('#newPass').val() === $('#confirmPass').val())
        {
            $.ajax({
                url: 'xhr/update_user.php',
                data: {
                    first_name: $('#first').val(),
                    last_name:  $('#last').val(),
                    password: $('#confirmPass').val(),
                    phone: $('#phone').val(),
                    city: $('#city').val(),
                    state: $('#state').val(),
                    zipcode: $('#zipcode').val(),
                    email: $('#email').val()
    //                avatar:
                },
                type: 'post',
                dataType: 'json',
                success: function(response){
                    if(response.error){
                        alert('Sorry having minor diffculties right now');

                    }else{
                       loadApp($('#user_id').val());
                    }
                }
            })
        }else{
            alert('The passwords do not match')
        }
    };

    var deleteProj = function(projID){
        $.ajax({
            url:'xhr/delete_project.php',
            data: {projectID: projID},
            dataType: 'json',
            type: 'post',
            success: function(response){
                if(response.error){
                    alert('Sorry can not delete your Project at this moment.')
                }else{
                    loadApp($('#user_id').val());
                }
            }
        })
    };

    var deleteTask = function(taskID){
        $.ajax({
            url: 'xhr/delete_task.php',
            data: {taskID: taskID},
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    alert('Sorry at this moment we can not delete you task.');
                }else{
                    loadApp($('#user_id').val());
                }
            }
        })
    };

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


    /* Switch to the SignUp page from the testimonies */
    $('.signUp').live('click', function(e){
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

    /* When the user logs out*/
    $('.user').live('click', function(e){
        e.preventDefault();
        console.log("userInfo");
        $.ajax({
            url:'xhr/get_user.php',
            data: {userID: $('#user_id').val()},
            dataType: 'json',
            type: 'get',
            success: function(response){
                console.log(response)
                if(response.error){
                    alert("Can not update user right now.")
                }else{
                    $('#updateUser').dialog({
                        modal: true,
                        height: 500
                    }).show();
                }
            }
        });

        return false;
    });

    $('#userUpdate').live('click', function(e){
        e.preventDefault();
        console.log('Sending update');

        updateUser();
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
    $('.viewAllTasks').live('click', function(e){
        e.preventDefault();
        console.log('new task');
        //console.log($(this));
        var next = $(this).parent('.infoMain');
        var next1 = next.find('.projID');

       console.log(next.siblings('.viewTaskList'));
       var idAdd = next.siblings('.viewTaskList');


      getTasks(next1.html(), idAdd);

        return false;

    });

    /* For viewing the task*/
    $('#taskInfo').live('click', function(e){
        e.preventDefault();
        console.log('new task');
        console.log($(this));

        var next = $(this).find('span');
        var next2 = $(this).find('a > i');
        console.log(next.html());
        console.log(next2.html());

        var par = $(this).parent();
        var par1 = par.parent();
        var par2 = par1.siblings('.taskView');
        console.log(par2);

        viewTasks(next.html(), next2.html(), par2);
        return false;

    });

    /* For adding a new project button that will send the info and refresh page*/
    $('#addingTask').live('click', function(e){
        e.preventDefault();
        console.log("adding task");


        console.log(id);
        addTask(id);

        return false;
    });

    /*For closing the view for when a project doesn't have a tasks*/
    $('.closeView').live('click', function(e){
        e.preventDefault();
        console.log("Closing...");
        $(this).parent().hide();

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


        var next = $(this).parent('.infoMain');
        var update = next.siblings('.projectUpdate');
        console.log(next.find('.projID').html());
        updateProj($('.projID').html());
        return false;
    });

    /* For adding a new project, the modal will show*/
    $('#addNewTask').live('click', function(e){
        e.preventDefault();
        console.log("addtask");
        $('#newTask').dialog({
            modal: true,
            height: 260

        }).show();
        return false;
    });

    /* For adding a new project, the modal will show*/
    $('#addNew').live('click', function(e){
        e.preventDefault();
        console.log("add");
         $('#newProject').dialog({
             modal: true,
             height: 260

         }).show();
        return false;
    });

    /* For adding a new project button that will send the info and refresh page*/
    $('#addingProject').live('click', function(e){
        e.preventDefault();
        console.log("adding");
        console.log( $('#pStatus').val());
        //$('#pName').val()
        addProject();

        return false;
    });

    /* For adding a new project button that will send the info and refresh page*/
    $('#requestClient').live('click', function(e){
        e.preventDefault();
        console.log("adding clients?");
        $.get('templates/app.html', function(html){

            $('#newClient').dialog().show();
        });


        return false;
    });

    $('#addClient').live('click', function(e){
        e.preventDefault();
        newClient($('#clientName').val());
    });

    $('.clientInfo').live('click', function(e){
        e.preventDefault();
        console.log('info');
        var prev = $(this).parent();
        var next = prev.parent();
        var next1 = next.siblings('#infoClient');
        console.log(next1);
        viewClient();
    })

    /* When the user deletes a project*/
    $('.deleteProject').live('click', function(e){
        e.preventDefault();
        console.log("deleting Project...");
        console.log($(this).siblings('.projID').html());

       deleteProj($(this).siblings('.projID').html())
        return false;
    });

    /* When the user deletes a task*/
    $('.deleteTask').live('click', function(e){
        e.preventDefault();
        console.log("deleting task...");
        console.log($(this).siblings('.uniqueID').html());

        deleteTask($(this).siblings('.uniqueID').html())
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