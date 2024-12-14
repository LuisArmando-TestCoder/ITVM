function play(url: string) {
  var audio = document.createElement("audio");

  // Set the crossOrigin attribute to 'anonymous'
  audio.crossOrigin = "anonymous";

  // Set the source of the audio element
  audio.src = url;

  audio.play();

  audio.remove();
}

export function playTick() {
  play("./SFX/tick2.mp3");
}
