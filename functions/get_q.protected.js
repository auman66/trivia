// Access the open helper method for the Asset
const openFile = Runtime.getAssets()["/questions.json"].open;

// Open the Private Asset and read the contents.
// Calling open is equivalent to using fs.readFileSync(asset.filePath, 'utf8')
const questions = JSON.parse(openFile());

const qCount = Object.keys(questions).length;

exports.handler = (context, event, callback) => {
  const asked = event.asked.split("-");
  const all_qs = [...Array(qCount).keys()].map((q) => (++q).toString());
  const avail_qs = all_qs.filter((q) => {
    return !asked.includes(q);
  });
  const qNum = avail_qs[Math.floor(Math.random() * avail_qs.length)];
  resp = {
    qNum,
    question: questions[qNum].question,
    answer: questions[qNum].answer,
  };

  return callback(null, resp);
};
