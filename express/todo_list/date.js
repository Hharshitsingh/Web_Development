//jshint esversion:6

exports.getDate = function (){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    // en-US
    // "hi-IN"
    return today.toLocaleDateString("hi-IN", options);
}

exports.getDay = function (){
    let today = new Date();
    let options = {
        weekday: "long",
    }
    // en-US
    // "hi-IN"
    return today.toLocaleDateString("hi-IN", options);
}
