body = document.getElementById("boxes")

fetchUrl = 'https://firestore.googleapis.com/v1/projects/lively-metrics-274623/databases/(default)/documents/montecarlo/'
accessToken = '' // Insert access toke here


fetch(fetchUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken
  }
})
.then(response => response.json())
.then(data => {

    console.log(data)
    docs = data.documents

    for(i=0; i < docs.length; i++){

        var points = docs[i].fields.points.integerValue;
        var processors = docs[i].fields.processors.integerValue;
        var time = docs[i].fields.time.doubleValue;
        var pi = docs[i].fields.pi.doubleValue;

        var appendStr = genDiv(points, processors, time, pi)

        body.innerHTML += appendStr;

    }

})
.catch((error) => {
  console.error('Error:', error);
});


function genDiv(points, processors, time, pi){
    return "<div class=\"col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0\" data-aos=\"zoom-in\" data-aos-delay=\"200\">"
            + "<div class=\"icon-box\">"
            + "<div class=\"icon\"><i class=\"ri-stack-line\"></i></div>"
            + "<h4 class=\"title\">Processors: " + processors + "</h4>"
            + "<p class=\"description\">Points: " + points + "</p>"
            + "<p class=\"description\">Time: " + time + "</p>"
            + "<p class=\"description\"><b>Estimated Pi Value: " + pi + "</b></p>"
            + "</div></div>"
}