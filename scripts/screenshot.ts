import { chromium } from '@playwright/test';
import { execSync } from 'child_process';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

async function waitForServer(maxAttempts = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch('http://localhost:5173');
      if (response.ok) {
        return true;
      }
    } catch (error) {
      // 서버가 아직 시작되지 않았거나 연결할 수 없는 상태
    }
    // 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`서버 연결 시도 중... (${i + 1}/${maxAttempts})`);
  }
  return false;
}

async function updateReadmeScreenshot(screenshotPath: string) {
  const readmePath = path.join(process.cwd(), 'README.md');
  if (!fs.existsSync(readmePath)) {
    console.log('README.md 파일을 찾을 수 없습니다.');
    return;
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const screenshotFileName = path.basename(screenshotPath);

  // 정규식으로 스크린샷 경로를 찾아서 업데이트
  const regex = /<img src="docs\/assets\/\d{6}\.png"/;
  if (regex.test(readmeContent)) {
    readmeContent = readmeContent.replace(regex, `<img src="docs/assets/${screenshotFileName}"`);
    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('README.md의 스크린샷 경로가 업데이트되었습니다.');
  } else {
    console.log('README.md에서 스크린샷 경로를 찾을 수 없습니다.');
  }
}

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

async function commitChanges(screenshotPath: string) {
  try {
    // 파일이 존재하는지 확인
    if (!fs.existsSync(screenshotPath)) {
      console.error('스크린샷 파일이 생성되지 않았습니다.');
      return false;
    }

    // Git 상태 확인
    const status = execSync('git status --porcelain').toString();
    if (!status.includes(path.basename(screenshotPath))) {
      console.log('변경된 파일이 없습니다.');
      return false;
    }

    // 변경사항 스테이징
    execSync(`git add ${screenshotPath}`);
    execSync('git add README.md');

    // 사용자에게 커밋 여부 확인
    const answer = await askQuestion('변경사항을 커밋하시겠습니까? (y/n): ');
    if (answer !== 'y') {
      console.log('커밋이 취소되었습니다.');
      return false;
    }

    // 커밋 메시지 생성
    const today = format(new Date(), 'yyyy-MM-dd');
    const commitMessage = `docs: Update screenshot (${today})`;

    // 커밋 생성
    execSync(`git commit -m "${commitMessage}"`);
    console.log('변경사항이 성공적으로 커밋되었습니다.');
    return true;
  } catch (error) {
    console.error('커밋 중 오류가 발생했습니다:', error);
    return false;
  }
}

async function takeScreenshot() {
  // 개발 서버가 실행 중인지 확인
  console.log('개발 서버 연결 확인 중...');
  const isServerRunning = await waitForServer();
  if (!isServerRunning) {
    console.error('개발 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    process.exit(1);
  }

  console.log('브라우저 시작 중...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: {
      width: 2560,
      height: 1440,
    },
  });
  const page = await context.newPage();

  try {
    console.log('페이지 로딩 중...');
    // localhost:5173에 접속
    await page.goto('http://localhost:5173');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('networkidle');

    // docs/assets 폴더가 없으면 생성
    const assetsDir = path.join(process.cwd(), 'docs', 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    // 현재 날짜를 YYMMDD 형식으로 가져오기
    const today = format(new Date(), 'yyMMdd');
    const screenshotPath = path.join(assetsDir, `${today}.png`);

    console.log('스크린샷 찍는 중...');
    // 전체 페이지 스크린샷 찍기
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    console.log(`스크린샷이 저장되었습니다: ${screenshotPath}`);

    // README.md 업데이트
    await updateReadmeScreenshot(screenshotPath);

    // 변경사항 커밋
    await commitChanges(screenshotPath);
  } catch (error) {
    console.error('스크린샷을 찍는 중 오류가 발생했습니다:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshot();
