import { chromium } from '@playwright/test';
import { format } from 'date-fns';
import path from 'path';
import fs from 'fs';
import http from 'http';

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
      width: 3840,
      height: 1290,
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
  } catch (error) {
    console.error('스크린샷을 찍는 중 오류가 발생했습니다:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshot();
