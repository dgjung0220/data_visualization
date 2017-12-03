### 데이터 로딩 에러
d3.csv() , d3.json() 등은 모두 비동기 메서드다. 그래서 브라우저로 csv 파일 다운로드가 진행되는 동안에도 그 다음 줄의 코드가 실행된다. 이런 점은 잠재적으로 에러를 일으킨다. 콜백 함수를 이용하여 콜백 안에서만 데이터를 참조하자.

<pre><code>
var dataset;

d3.csv("test.csv", function(data) {
    dataset = data;
    doSomething(); // 받은 데이터를 참조하는 다른 함수 호출. 
})
</code></pre>
error 인자 이용.
<pre>
<code>
var dataset;

d3.csv("test.csv", function(error, data) {
    if (error) {
        console.log(error);
    } else  {
        console.log(data);
        dataset = data;
        doSomething();
    }
})
</code></pre>


### 데이터 사용

enter() 를 사용하면 해당 DOM 갯수를 확인하고, 데이터보다 적으면 늘려서 생성한다.

<pre><code>
var dataset = [5,10,15,20,25];

d3.select("body").selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text("New paragraph);
</code></pre>

<pre>
<code>
var dataset = [5,10,15,20,25];

d3.select("body").selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d) {return d;});
</code>
</pre>

### attr & style
attr()은 html의 속성을 지정하고 style()은 css property 를 지정한다.

<code>
.style("color","red");
</code>

함수를 사용할수 도 있다.
<pre><code>
.style("color", function(d){
    if (d > 15) {
        return "red";
    } else {
        return "black";
    }
})
</code></pre>

### div 를 이용한 드로잉
style.css
<pre><code>
div.bar {
    display : inline-block;
    width: 20px;
    height: 75px;
    margin-right: 2px;
    background-color: teal;
}
</code></pre>
dataset에 0~30 사이의 난수를 25개 생성하여 div bar 막대로 그려준다.
<pre><code>
var dataset = new Array;
for (var i = 0; i < 25; i++) {
    var newNum = Math.random() * 30; // 0 ~ 30  사이의 난수
    dataset.push(newNum);

}

d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        return d*5 + "px";
    });
</code></pre>

이 떄 <code>.attr("class", "bar")</code> 는 <code>.classed("bar", true)</code> 로 간단히 대체할 수 있다. class 해제는 <code>.classed("bar", false)</code> 로 가능하다.

### svg 를 이용한 드로잉
아래 코드는 svg를 생성하고 circle를 그린다.
<pre><code>
var svg = d3.select("body").append("svg");
svg.attr("width", 500).attr("height", 50);

var circles =svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle");

circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
        })
        .attr("cy", 25)
        .attr("r", function(d){return d;});
</code></pre>
추가로 circles에 외곽선, 채우기 속성 등을 지정한다.
<pre><code>
        .attr("fill", "yellow")
        .attr("stroke", "red")
        .attr("stroke-width", function(d) {
            return d/4;
        })
</code></pre>

### svg 막대 차트
<pre><code>
var w = 500;
var h = 100;
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
</code></pre>

#### 여러 값 한 번에 매핑
<pre><code>
svg.select("circle")
    .attr("cx",0)
    .attr("cy",0)
    .attr("fill", "red");
</code></pre>
attr 속성을 한 번에 아래와 같이 묶을 수 있다.
<pre><code>
svg.select("circle")
    .attr({
        cx : 0,
        cy : 0,
        fill : red
    })
</code></pre>
style 도 atrr 과 마찬가지로 묶어서 지정할 수 있다.

### 라벨의 사용
아래는 라벨을 위에서 만든 막대 그래프의 상위 중간에 넣는 코드이다.
<pre><code>
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
</code></pre>

이 때 라벨을 바의 중간에 위치시키기 위해 아래와 같이 지정한다.
<pre><code>
    .attr("x", function(d, i) {
            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    })
    .attr("text-anchor", "middle")
</code></pre>