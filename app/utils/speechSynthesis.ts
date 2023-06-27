export function cleanStringToSynthesis(str: string) {
  str = str
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(
      /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F900}-\u{1F9FF}|\u{1F1E0}-\u{1F1FF}|\u{1F200}-\u{1F2FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}]/gu,
      "",
    )
    .replace(/<div\s+class="date-chat".*?<\/div>/g, "")
    .replace(/\n/g, "");
  return str;
}

function internalSpeechSynthesis(
  utterances: SpeechSynthesisUtterance[],
  textParts: Array<string>,
  longText: string,
  endHandler: () => void,
) {
  // Read each piece of text sequentially
  function speakTextParts(index = 0) {
    if (index < utterances.length) {
      const textToHighlight = textParts[index];
      const highlightIndex = longText.indexOf(textToHighlight);

      // Speak the text
      speechSynthesis.speak(utterances[index]);
      utterances[index].addEventListener("end", () => {
        // Remove the highlight
        speakTextParts(index + 1);
      });

      // Remove the highlight if speech synthesis is interrupted
    } else {
      endHandler();
    }
  }

  // Begin speak
  speakTextParts();
}

export function doSpeechSynthesis(
  longText: string,
  /*voices: SpeechSynthesisVoice[], */ endHandler: () => void,
) {
  let msg = new SpeechSynthesisUtterance();
  msg.text = longText;
  window.speechSynthesis.speak(msg);
}

export function stopSpeechSysthesis() {
  window.speechSynthesis.cancel();
}
