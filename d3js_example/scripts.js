var dataset = new Array;
for (var i = 0; i < 25; i++) {
    var newNum = Math.round(Math.random() * 30); // 0 ~ 30  사이의 난수
    dataset.push(newNum);

}

 /* d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        return d*5 + "px";
    });
    */

/*var svg = d3.select("body").append("svg");
svg.attr("width", 500).attr("height", 50);

var circles =svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle");

circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
        })
        .attr("cy", 25)
        .attr("r", function(d){return d;})
        .attr("fill", "yellow")
        .attr("stroke", "red")
        .attr("stroke-width", function(d) {
            return d/4;
        })*/
        

// svg 의 폭, 넓이 지정.
var w = 500;
var h = 120;
var barPadding = 1;

var svg = d3.select("body").append("svg")
            .attr("width",w)
            .attr("height",h)

svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / dataset.length);
        })
        .attr("y", function(d) {
            return h - (d * 4);
        })
        .attr("width",w /dataset.length - barPadding)
        .attr("height", function(d) {
            return d * 4;
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")";
        });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("x", function(d, i) {
        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    })
    .attr("y", function(d) {
        return h - (d * 4) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle")