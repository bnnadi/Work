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
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	var loadApp = function(user_ID){

        $.get('templates/app.html', function(html){
             //clear first
            container.empty();
            $('.hidden').append(user_ID)


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

            var h = $(html);

            var appHead = h.find('#template_app_header').html();
            var site = $.template('landing', appHead);
            container.append(site);

            var appView = h.find('#template_task_view').html();
            var site = $.template('landing', appView);
            container.append(site);

            var appFoot = h.find('#template_app_footer').html();
            var site = $.template('landing', appFoot);		// compile template
            $.render(currentUser, 'landing');		// use template
            container.append(site);

            $('#datepicker').datepicker();
            $('#tabs').tabs();
            $('#accordion').accordion();
            $('#sortable').sortable();
            $('#sortable').disableSelection();


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

         $('#drop_login').toggle(true);
    };

    var hideLogin = function(){
            $('#drop_login').toggle(false);

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
                    loadApp();
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
                   loadApp(response.id.val());
                }

            }
        });
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

    $('.brand').live('click', function(e){
        e.preventDefault();
        console.log("home");

        init();

        return false;
    });

	$('.cta a').live('click', function(e){
        e.preventDefault();
        console.log("btn change");

        loadSignUp();

		return false;
	});

    $('.newUser').live('click', function(e){
        console.log("login drop");
        e.preventDefault();
        loadSignUp();

		return false;
	});

    $('.login a').live('click', function(e){
        e.preventDefault();
        console.log("run");
        showLogin();

        return false;
    });

    $('#submit').live('click', function(e){
        e.preventDefault();
        console.log('Logging in');
        hideLogin();
        Login();
    });

    $('#close a').live('click', function(e){
        e.preventDefault();
        console.log("disappear");
        hideLogin();

        return false;
    });

    $('#signedUp a').live('click', function(e){
        e.preventDefault();
        console.log("run");

        registerCheck();
        return false;
    });

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

	




