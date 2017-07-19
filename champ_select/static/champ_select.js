$(document).ready(function(){
    $('.clicker').css('opacity','0.7');

    // Load previously chosen champions
    temp = JSON.parse(localStorage.getItem('champs_selected'));
    temp.forEach(function(element) {
         $('#' + element).css('opacity', '1');
         $('#' + element).attr('data-click-state', 1);
    });

    // Selecting Champions
    $('.clicker').on('click',function(){
        if($(this).attr('data-click-state') == 1) {  
            $(this).attr('data-click-state', 0);
            $(this).css('opacity','0.7');
        } else {
            $(this).attr('data-click-state', 1);
            $(this).css('opacity','1');
        }
    });

    // Select all champions
    $('#selectall').click(function() {
       $('.clicker').each(function(i, obj) {
           $(this).css('opacity','1');
           $(this).attr('data-click-state', 1);
       }) 
    });
    
    // Deselect all champions
    $('#deselectall').click(function() {
        $('.clicker').each(function(i, obj) {
            $(this).css('opacity','0.7');
            $(this).attr('data-click-state', 0);
        })
    });
        
    // Checking which champions were chosen
    var champions = []
    $('#finish').click(function() {
        $('.clicker').each(function(i, obj) {
            if($(this).css('opacity') == 1) {
                champions.push($(this).attr('id'))     
            }       
        })
        // Debug: document.getElementById("myLink").innerHTML=champions;
        // Saving chosen champions to local storage
        localStorage.setItem('champs_selected', JSON.stringify(champions));

        // Sending chosen champs to app.py file to create filter
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(champions),
            dataType: 'json',
            url:'http://127.0.0.1:5000/champselect/',
            success: function (e) {
                console.log(e);
                window.location='http://127.0.0.1:5000/'
            },
            error: function(error){
                console.log(error);
            }
        })
    });   
});