// Access the open helper method for the Asset
const openFile = Runtime.getAssets()["/questions.json"].open;

// Open the Private Asset and read the contents.
// Calling open is equivalent to using fs.readFileSync(asset.filePath, 'utf8')
const questions = JSON.parse(openFile());

const qCount = Object.keys(questions).length;

// Input: array of asked questions in the form "1-2-3"
exports.handler = (context, event, callback) => {
  const asked = event.asked.split("-");
  const all_qs = [...Array(qCount).keys()].map((q) => (++q).toString());
  const avail_qs = all_qs.filter((q) => {
    return !asked.includes(q);
  });
  if (avail_qs.length <= 0) {
    return callback(null, { end: true });
  }
  const qNum = avail_qs[Math.floor(Math.random() * avail_qs.length)];

  // Output: question number, question, & correct answer
  resp = {
    qNum,
    question: questions[qNum].question,
    answer: questions[qNum].answer,
    q_id: questions[qNum].q_id,
    end: false,
  };

  return callback(null, resp);
};
