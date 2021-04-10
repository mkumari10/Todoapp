$('document').ready(function($) {
 
     let i=0, arrlist=[],completed=[],spreaded = [],active=[]; 
     $('.count').html(`${i} items left`);
     $('.all').css('color','hsl(220, 98%, 61%)');

      

  //checked the todo list item
	$(document).on('click','.itemleft',function(e){
       let check = $(this).is(':checked');
       if(check){
       	      $(this).siblings('img').removeClass('d-none');
              if($(this).siblings('input[type="text"]').hasClass('check-dark'))
              { 
              $(this).siblings('input[type="text"]').css({
       	      	                            'color':'hsl(233, 14%, 35%)',
       	      	                            'text-decoration':'line-through'
       	      	                          });
              }else if($(this).siblings('input[type="text"]').hasClass('check-light')){
                
                $(this).siblings('input[type="text"]').css({
                                             'color':'rgb(147, 148, 165)',
                                             'text-decoration':'line-through'
                                           });
              }
              i--;
              $('.count').html(`${i} items left`);
              // completed.push($(this).siblings('input[type="text"]').val());
              completed.push($(this).parent('div'));

       }
       else{
               $(this).siblings('img').addClass('d-none');
               if($(this).siblings('input[type="text"]').hasClass('check-dark')){
               $(this).siblings('input[type="text"]').css({
       	      	                            'color':'hsl(236, 33%, 92%)',
       	      	                            'text-decoration':'none'
       	      	                          });
               }else if($(this).siblings('input[type="text"]').hasClass('check-light')){
                 $(this).siblings('input[type="text"]').css({
                                             'color':'black',
                                             'text-decoration':'none'
                                           });
               }
               i++;
               $('.count').html(`${i} items left`);
               for(let i=0;i<completed.length;i++){
                 if($(completed[i]).find('input[type="text"]').val() === $(this).siblings('input[type="text"]').val()){
                   completed.splice(i,1);
                 }
               }
       }
	});


    //add item in todo list
	$('input[type="text"]').on('keypress',function(e){
        var keycode = (e.keycode ? e.keycode : e.which);
        if(keycode == '13'){
        	i++;
        	var todolist = $(this).parent("div").clone(true);
          arrlist.push(todolist);
            $(todolist).children('input[type="text"]').attr('disabled','true').addClass('check-dark');
            $(todolist).children('input[type="checkbox"]').addClass('itemleft');
            $(todolist).children().last().after('<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="crossed"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>');
            $(todolist).addClass('addeditems');
        	$('.addlist').prepend(todolist);
        	$(this).val('');
            $('.count').html(`${i} items left`);
       }
	});


	//add cross sign on hover
	$(document).on('mouseover','.addeditems',function(e){
		$(this).children('input').css('cursor','pointer');
         $(this).children('svg').css({
         	'cursor': 'pointer',
         	'display':'inline'
         });
	});

    
    //remove cross sign on hover
	$(document).on('mouseout','.addeditems',function(e){
		$(this).children('input').css('cursor','pointer');
         $(this).children('svg').css({
         	'cursor': 'pointer',
         	'display':'none'
         });
	});

   //remove items after clicking on cross sign
	$(document).on('click','.crossed',function(e){
		$(this).parent('div').remove();
		if(!($(this).siblings('.itemleft').is(':checked')))
		{ 
		 i--;
		 $('.count').html(`${i} items left`);
		}
	});


	//click event on menuitems 
	$('.menuitems').on('click',function(e){
	   $('.menuitems').css('color','hsl(233, 14%, 35%)');
       $(this).css('color','hsl(220, 98%, 61%)');

       //clear completed
       if($(this).attr('id')==='clear'){
       	  $('.itemleft:checked').each(function(){
              $(this).parent('div').remove();
       	  });
       }
	});


	//mode change
	$('.changemode').on('click',function(e){

        if($(this).attr('id') === "sun"){
        	$(this).addClass('d-none');
        	$('#moon').removeClass('d-none');
        	$('#tophead').removeClass('todo-desk-dark').addClass('todo-desk-light');
        	$('.bgcolors').removeClass('contain-desk-dark bgcolors-desk-dark').addClass('contain-desk-light bgcolors-desk-light');
          $('input[type="checkbox"]').removeClass('check-desk-dark').addClass('check-desk-light');
          $('.menuitems').removeClass('menu-dark-hover').addClass('menu-light-hover');
          $('.addeditems').children('input[type="text"]').removeClass('check-dark').addClass('check-light');
        }else{
        	$(this).addClass('d-none');
        	$('#sun').removeClass('d-none');
        	$('#tophead').removeClass('todo-desk-light').addClass('todo-desk-dark');
        	$('.bgcolors').removeClass('contain-desk-light bgcolors-desk-light').addClass('contain-desk-dark bgcolors-desk-dark');
          $('input[type="checkbox"]').removeClass('check-desk-light').addClass('check-desk-dark');
          $('.menuitems').removeClass('menu-light-hover').addClass('menu-dark-hover');
          $('.addeditems').children('input[type="text"]').removeClass('check-light').addClass('check-dark');
        }
	});

  function taskfind(){
          let removecomm = (a,b) => {
          a.forEach((el)=>b.forEach((e2)=>{
              if($(el).find('input[type="text"]').val()===$(e2).find('input[type="text"]').val()){
                spreaded.push(el);
              }
          }))
          return spreaded;
        };
        return(removecomm(completed,arrlist));
 }

  //Show completed task
  $(".complete").on('click',function(e){
      let showcompleted = taskfind();
      arrlist.forEach((el)=>{
         $(el).hide();
      });
      showcompleted.forEach((el)=>{
         $(el).show();
      });
   });

   //Show all task
    $(".all").on('click',function(e){
      arrlist.forEach((el)=>{
         $(el).show();
      });
    });

    //Active tasks
    $('.active').on('click',function(e){
      let showcompleted = taskfind();
      arrlist.forEach((el)=>{
         $(el).show();
      });
      (showcompleted).forEach((el)=>{
         $(el).hide();
      });
    });
 });     