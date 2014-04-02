//init components
$(document).ready(function() {
    var sections= $("section");
    $.each(sections, function(i) {
        var section = $(sections[i]);
        var compName = section.attr("data-name");
        if (compName) {
            window[compName].init(section);
        }
    });
});