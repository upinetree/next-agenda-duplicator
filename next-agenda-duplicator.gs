function onOpen() {
  DocumentApp.getUi()
    .createMenu('スクリプト')
    .addItem('次回のアジェンダを作る', 'createNextAgenda')
    .addToUi();
}

function createNextAgenda() {
  var doc = DocumentApp.getActiveDocument();
  var ui = DocumentApp.getUi();

  var nextDate = getNextDateString(doc);
  if (!nextDate) {
    ui.alert("日付を範囲選択してください。");
    return;
  }

  var baseName = getBaseName(doc);
  if (!baseName) {
    ui.alert("タイトルが不正です");
    return;
  }

  var newName = baseName + " " + nextDate;
  var nextFile = DriveApp.getFileById(doc.getId()).makeCopy(newName);
  setNextAgendaDate(nextFile, nextDate);
  // ダイアログを出す前に新しい文書の操作をしても、反映されるのはダイアログを閉じた後になってしまう…
  ui.alert("ファイル「" + newName + "」にコピーしました！\n（新しい文書中の日付の置換はこのダイアログを閉じてから実行されます）\n\n" + nextFile.getUrl());
}

// ファイルタイトルの最初の半角スペース出現までをキャプチャする
// e.g.) "ほげほげ YYYY-MM-DD" => "ほげほげ"
function getBaseName(doc) {
  return doc.getName().match('^.*(?= )')[0];
}

function getNextDateString(doc) {
  var selection = doc.getSelection();
  if (!selection) return;

  var rangeElem = selection.getRangeElements()[0];
  var elem = rangeElem.getElement();

  var startOffset = rangeElem.getStartOffset();
  var endOffset = rangeElem.getEndOffsetInclusive();
  var nextDateString = elem.asText().getText().substring(startOffset, endOffset + 1);

  return nextDateString;
}

function setNextAgendaDate(nextFile, nextDate) {
  var body = DocumentApp.openById(nextFile.getId()).getBody();
  body.replaceText('.*@date', nextDate + ' @date')
}
