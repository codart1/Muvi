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
