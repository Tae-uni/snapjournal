const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const templatePath = path.join(__dirname, 'developer-note-template.md');
const date = new Date().toISOString().split('T')[0];

rl.question('Enter the goal for today: ', (goal) => {
  const fileName = `${date}_${goal.replace(/\s+/g, '-')}.md`;
  const newNotePath = path.join(__dirname, fileName);

  fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) throw err;
    
    // 템플릿 파일 내용에서 {{date}}와 {{goal}}을 실제 값으로 대체
    let content = data.replace(/{{date}}/g, date).replace(/{{goal}}/g, goal);

    // 새로운 파일에 대체된 내용 쓰기
    fs.writeFile(newNotePath, content, 'utf8', (err) => {
      if (err) throw err;
      console.log(`Developer note created: ${newNotePath}`);
      rl.close();
    });
  });
});