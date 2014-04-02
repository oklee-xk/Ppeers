(function(room, $) {
    var camIndex;
    var connection = {};
    var cams = [];
    room.ele = [];

    var createCam = function(streamObj) {
        var size = 150;
        var cam = $('<div />');
        if (streamObj) {
            var mediaElement = getMediaElement(streamObj.mediaElement, {
                width: size,
                buttons: []
            });
            cam.append(mediaElement);
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

        //open connection
        connection = new RTCMultiConnection();
        connection.session = {
            audio: false,
            video: true
        };

        connection.onstream = function(e) {
            room.openCam(e);
        };

        connection.connect();

        console.info("Init ROOM");
    };

    room.openConnection = function() {
        connection.open();
    };

    room.getCam = function(cam) {
        if ($.isNumeric(cam)) {
            return cams[cam];
        } else {
            return cams;
        }
    }
}(window.room = window.room || {}, jQuery));