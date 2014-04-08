/**
 * This is the User Interface part of the room.
 * It controls all the graphics like cams, responsive
 * user list (but only how it looks).
 *
 * connection.js manage how many users and this things.
 */
(function(room, $) {
    var camIndex;
    var cams = [];
    room.ele = [];

    var createCam = function(streamObj) {
        var size = 150;
        var cam = $('<div />');
        if (streamObj) {
//            var mediaElement = getMediaElement(streamObj.mediaElement, {
//                width: size,
//                buttons: []
//            });
            streamObj.mediaElement.width = size;
            cam.append(streamObj.mediaElement);
        } else {
            cam.css("width", size);
            cam.css("height", size *.7);
        }
        cam.addClass("camera");
        cam.css("z-index", camIndex++);

        return cam;
    };

    var initPanel = function () {
        var userList = $("section.workspace #users-list");
        //responsive typo
        userList.flowtype({ fontRatio : 12 });
    };

    room.openCam = function(streamObj) {
        var cam = createCam(streamObj);
        room.ele.before(cam);

        cam.draggable({
            snap: true,
            containment: "body"
        });

        cams.push(cam);
    };

    room.init = function(element) {
        room.ele = element;
        camIndex = room.ele.css("zIndex") + 1;

        //this controls all the sizes and proportions
        initPanel();

        console.info("Init ROOM");

        //init the connection part
        connection.init();
    };

    room.getCam = function(cam) {
        if ($.isNumeric(cam)) {
            return cams[cam];
        } else {
            return cams;
        }
    }
}(window.room = window.room || {}, jQuery));