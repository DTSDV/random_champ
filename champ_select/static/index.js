// Filter Menu
jQuery(function() {
    function slideMenu() {
        var activeState = jQuery('#menu-container .menu-list').hasClass('active');
        jQuery('#menu-container .menu-list').animate({
            left: activeState ? '0%' : '-100%'
        }, 400);
    }

    jQuery('#menu-wrapper').click(function(event) {
        event.stopPropagation();
        jQuery('#hamburger-menu').toggleClass('open');
        jQuery('#menu-container .menu-list').toggleClass('active');
        slideMenu();
        jQuery('body').toggleClass('overflow-hidden');
    });

    jQuery(".menu-list").find('.accordion-toggle').click(function() {
        jQuery(this).toggleClass("active-tab").find("span").toggleClass("icon-minus icon-plus");
        jQuery(this).next().toggleClass("open").slideToggle("fast");
        jQuery(".menu-list .accordion-content").not(jQuery(this).next()).slideUp("fast").removeClass("open");
        jQuery(".menu-list .accordion-toggle").not(jQuery(this)).removeClass("active-tab").find("span").removeClass("icon-minus").addClass("icon-plus")
    });
}); // jQuery load

// Select all checkboxes //
function toggle(source) {
  checkboxes = document.getElementsByName('faction');
  for(var i=0, n=checkboxes.length; i<n; i++) {
    checkboxes[i].checked = source.checked;
  }
}

function toggle_dmg(source) {
  checkboxes = document.getElementsByName('ad-ap');
  for(var i=0, n=checkboxes.length; i<n; i++) {
    checkboxes[i].checked = source.checked;
  }
}

function toggle_role(source) {
    checkboxes = document.getElementsByName('role');
    for(var i=0, n=checkboxes.length; i<n; i++) {
        checkboxes[i].checked=source.checked;
    }
}

// Saving state of checkboxes on refresh //
$(document).ready(function() {
    var checked = JSON.parse(localStorage.getItem('checked_boxes'));
    checked.forEach(function(element) {
        $('#'+element).prop('checked', true);
    });

    $("#pick").click(function () {
        var $fact_boxes = $('input[name=faction]:checked');
        var $ad_ap_boxes = $('input[name=ad-ap]:checked');
        var $role_boxes = $('input[name=role]:checked');
        var checked_boxes = [];

        $fact_boxes.each(function() {
           checked_boxes.push(($(this).val()));
        });

        $ad_ap_boxes.each(function() {
           checked_boxes.push(($(this).val()));
        });

        $role_boxes.each(function() {
            checked_boxes.push(($(this).val()));
        });

        localStorage.setItem('checked_boxes', JSON.stringify(checked_boxes));
    });
});

