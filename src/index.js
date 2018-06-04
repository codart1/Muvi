import $ from "jquery";
import Analyser from "./analyser";
import Visualizer from "./visualizer";

import trackList from "./tracks";

var $audio = $("#myAudio");

$("#play").on("click", () => {
  $("#start").addClass("hide");

  $audio.attr("src", trackList[0]);
  const analyser = new Analyser($("audio")[0]),
    visualizer = new Visualizer(analyser, $("#canvasContainer")[0]);
  $audio[0].play();
});

$("#upload").on("click", function() {
  const $input = $(this).find("input");

  // console.log(this)

  // $input.trigger("click");

  // $("input").on("change", function(e) {
  //   +  var target = e.currentTarget;
  //   +  var file = target.files[0];
  //   +
  //   +  const url = URL.createObjectURL(file);
  //   +
  //   +  $audio.attr("src", url);
  //   +
  //   +  const analyser = new Analyser($("audio")[0]),
  //   +    visualizer = new Visualizer(analyser, $("#canvasContainer")[0]);
  //   +});
});

$("#pickSong").on("change", function(e) {
  const target = e.currentTarget;
  console.log(target.files)
  const file = target.files[0];


  const url = URL.createObjectURL(file);

  $audio.attr("src", url);

  const analyser = new Analyser($("audio")[0]),
    visualizer = new Visualizer(analyser, $("#canvasContainer")[0]);
  $audio[0].play();

  $("#start").addClass("hide");
});
