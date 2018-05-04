import $ from "jquery";
import Analyser from "./analyser";
import Visualizer from "./visualizer";

var $audio = $("#myAudio");
$("input").on("change", function(e) {
  var target = e.currentTarget;
  var file = target.files[0];

  const url = URL.createObjectURL(file);

  $audio.attr("src", url);

  const analyser = new Analyser($("audio")[0]),
    visualizer = new Visualizer(analyser, $("#canvasContainer")[0]);
});
